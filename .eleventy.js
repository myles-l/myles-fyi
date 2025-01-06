const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItContainer = require("markdown-it-container");

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksFilter("niceDate", function(arr) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = arr.getUTCDate();
    let month = arr.getUTCMonth();
    let year = arr.getUTCFullYear();
    return day.toString() + " " + months[month] + " " + year.toString();
  });

  eleventyConfig.addNunjucksFilter("yearOnly", function(arr) {
    let year = arr.getUTCFullYear();
    return year.toString();
  });

  eleventyConfig.addShortcode("pic", async function(file, alt, classes, caption) {
    // Process images
    let path;
    if (this.page.url && !(this.page.url === "/")) {
      path = this.page.url;
    } else {
      let i = file.lastIndexOf("/");
      if (i > 0) {
        path = file.slice(0, i+1);
        file = file.substr(i);
      }
    }
    let src = "site" + path + file;
    let data = await Image(src, {
			widths: [480, 640, 960, 1280, 1920, 2560],
			formats: ["auto"],
      urlPath: path + "images/",
      outputDir: "export" + path + "images/",
      sharpPngOptions: { 
        compressionLevel: 8, 
        palette: true 
      },
      svgShortCircuit: true,
		});
    let images;
    if (data.svg) {
      images = data.svg;
    } else if (data.jpeg) {
      images = data.jpeg;
    } else if (data.png) {
      images = data.png;
    } else {
      console.log("only PNG, JPG, or SVG supported");
    }

    // Determine if we need to scale up breakpoints to account for the grid
    let multiplier = 1;
    let compactMultiplier = 1;
    let breakpoint = 768; // breakpoint of mobile size (48rem)
    if (classes) {
      if (classes.includes("span-one-third")) {
        multiplier = 3;
      } else if (classes.includes("span-half")) {
        multiplier = 2;
      } else if (classes.includes("span-two-thirds")) {
        multiplier = 1.5;
      } else if (classes.includes("span-five-sixths")) {
        multiplier = 1.2;
      }
      if (classes.includes("expand-half")) {
        compactMultiplier = 2;
      } else if (classes.includes("expand-two-thirds")) {
        compactMultiplier = 1.5;
      } else if (classes.includes("expand-five-sixths")) {
        compactMultiplier = 1.2;
      } else if (classes.includes("expand")) {
        compactMultiplier = 1;
      } else {
        compactMultiplier = multiplier;
      }
    }

    // Assemble the picture with breakpoints
    let html;
    if (!classes || classes == "") {
      classes = "";
    } else {
      classes = ` class="${classes}"`;
    }
    if (caption) {
      html = `<figure${classes}>\n<picture>\n`;
    } else {
      html = `<picture${classes}>\n`;
    }
    for (let i in images){
      if (i >= (images.length - 1)) {
        html += `<img src="${images[i].url}" alt="${alt}" role="img" width="${images[i].width}" height="${images[i].height}" />\n`;
      } else {
        html += `<source srcset="${srcset(images[i])}" media="${media(images[i])}" />\n`;
      }
    }
    if (caption) {
      html += `</picture>\n<figcaption>${caption}</figcaption>\n</figure>\n`;
    } else {
      html += `</picture>\n`;
    }
    return html;

    function srcset(image) {
      let two = images.find(images => {
        return images.width === image.width * 2;
      });
      if (two) {
        return image.url + ", " + two.url + " 2x" ;
      } else {
        return image.url;
      }
    }

    function media(image) {
      let prev;
      for (let i in images){
        if (((images[i].width > prev) || !prev) && (images[i].width < image.width)) {
          prev = images[i].width;
        }
      }
      if (prev) {
        if (image.width < breakpoint) {
          return "(" + (prev * compactMultiplier) + "px < width <= " + (image.width * compactMultiplier) + "px)";
        } else {
          return "(" + (prev * multiplier) + "px < width <= " + (image.width * multiplier) + "px)";
        }
      } else {
        if (image.width < breakpoint) {
          return "(width <= " + (image.width * compactMultiplier) + "px)";
        } else {
          return "(width <= " + (image.width * multiplier) + "px)";
        }
      }
    }
  });

  eleventyConfig.addShortcode("link", function(url, text) {
		return `<a class="tooltip-link" href="${url}"><span class="tooltip">${url}</span>${text}</a>`;
	});

	eleventyConfig.addShortcode("caption", function(text) {
    return `<p class="caption">${text}</p>`;
	});

	eleventyConfig.setLibrary("md", markdownIt({
		html: true,
		breaks: true,
    typographer: true,
	}));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItContainer,'grid',{  
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<div class="grid">\n';
      } else {
        return '</div>\n';
      }
    }
  }));

  eleventyConfig.addWatchTarget("site/work/**/*.md");
  eleventyConfig.addPassthroughCopy('site/styles/*.css');
  eleventyConfig.addPassthroughCopy('site/scripts/*.js');
  eleventyConfig.addPassthroughCopy('site/assets');
  eleventyConfig.addPassthroughCopy('site/robots.txt');
  
  return {
    templateFormats: [
			"md",
			"njk",
			"html"
		],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "site",
      includes: "layouts",
      data: "data",
      output: "export"
    }
  }
};
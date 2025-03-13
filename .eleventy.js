const Image = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier-terser");
const CleanCSS = require("clean-css");
const terser = require("terser");

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

  eleventyConfig.addShortcode("pic", async function(slug, file, alt, classes) {
    // Process images
    let path = "work/" + slug + "/";
    let src = "site/" + path + file;
    let data = await Image(src, {
			widths: [480, 640, 960, 1280, 1920, 2560],
			formats: ["auto"],
      urlPath: path,
      outputDir: "export/" + path,
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
    if (!classes || classes == "") {
      classes = "";
    } else {
      classes = ` class="${classes}"`;
    }
    let html = `<picture${classes}>`;
    for (let i in images){
      if (i >= (images.length - 1)) {
        html += `<img src="${images[i].url}" alt="${alt}" role="img" width="${images[i].width}" height="${images[i].height}" loading="lazy" />`;
      } else {
        html += `<source srcset="${srcset(images[i])}" media="${media(images[i])}" />`;
      }
    }
    html += `</picture>`;
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
  
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addPassthroughCopy('site/assets');
  eleventyConfig.addPassthroughCopy('site/robots.txt');

  eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function (content) {
			let result = new CleanCSS().minify(content);
			return async () => {
				return result.styles;
			};
		},
	});

  eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		compile: async function (content) {
			let result = await terser.minify(content);
			return async () => {
				return result.code;
			};
		},
	});

  eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
			});
			return minified;
		}
		// If not an HTML output, return content as-is
		return content;
	});
  
  return {
    templateFormats: [
      "md",
			"njk",
			"html",
      "css",
      "js"
		],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "site",
      includes: "layouts",
      data: "data",
      output: "export"
    }
  }
};
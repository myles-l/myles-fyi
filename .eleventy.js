const Image = require("@11ty/eleventy-img");

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

  eleventyConfig.addShortcode("pic", async function(file, classes, alt, caption) {
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
			widths: [480, 960, 1280, 1920, 2560],
			formats: ["auto"],
      urlPath: path + "images/",
      outputDir: "export" + path + "images/",
      sharpPngOptions: { 
        compressionLevel: 8, 
        palette: true 
      },
		});
    let images;
    if (data.jpeg) {
      images = data.jpeg;
    } else if (data.png) {
      images = data.png;
    } else {
      console.log("Only PNG and JPG supported!");
    }

    // Determine if we need to scale up breakpoints to account for the grid
    let multiplier = 1;
    if (classes.includes("span-one-third")) {
      multiplier = 3;
    } else if (classes.includes("span-half")) {
      multiplier = 2;
    } else if (classes.includes("span-two-thirds")) {
      multiplier = 1.5;
    } else if (classes.includes("span-five-sixths")) {
      multiplier = 1.2;
    }

    // Apply scaling to the breakpoints
    let xSmall = 480;
    if (!classes.includes("expand")) {
      xSmall *= multiplier;
    }
    let small = 640 * multiplier;
    let medium = 960 * multiplier;
    let large = 1280 * multiplier;
    let xLarge = 1920 * multiplier;

    // Assemble the picture with breakpointss
    let html;
    if (caption) {
      html = `<figure class="${classes}">\n<picture>\n`;
    } else {
      html = `<picture class="${classes}">\n`;
    }
    for (let i in images){
      if (i >= (images.length - 1)) {
        html += `<img src="${images[i].url}" alt="${alt}" width="${images[i].width}" height="${images[i].height}" />\n`;
      } else if (images[i].width == 480) {
        html += `<source srcset="${images[i].url}" media="(width <= ${xSmall}px) and (resolution < 2x)" />\n`;
      } else if (images[i].width == 960) {
        html += `<source srcset="${images[i].url}" media="((${xSmall}px < width <= ${medium}px) and (resolution < 2x)) or ((width <= ${xSmall}px) and (resolution >= 2x))" />\n`;
      } else if (images[i].width == 1280) {
        html += `<source srcset="${images[i].url}" media="((${medium}px < width <= ${large}px) and (resolution < 2x)) or ((${xSmall}px < width <= ${small}px) and (resolution >= 2x))" />\n`;
      } else if (images[i].width == 1920) {
        html += `<source srcset="${images[i].url}" media="((${large}px < width <= ${xLarge}px) and (resolution < 2x)) or ((${small}px < width <= ${medium}px) and (resolution >= 2x))" />\n`;
      }
    }
    if (caption) {
      html += `</picture>\n<figcaption>${caption}</figcaption>\n</figure>\n`;
    } else {
      html += `</picture>\n`;
    }
    return html;
});

  eleventyConfig.addShortcode("link", function(url, text) {
		return `<a class="tooltip-link" href="${url}"><span class="tooltip">${url}</span>${text}</a>`;
	});

  eleventyConfig.addShortcode("text", function() {
		return "<div class='paragraph span-all'>\n";
	});

  eleventyConfig.addShortcode("endtext", function() {
    return "\n</div>";
	});

	eleventyConfig.addShortcode("caption", function(text) {
    return `<p class="caption">${text}</p>`;
	});

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
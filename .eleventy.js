const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
  const mdLib = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", mdLib);

  // ВАЖНО: сказать Eleventy, где лежит контент и инклюды
  return {
    dir: {
      input: "src",        // твой контент: ch1.md, intro1.md и т.п.
      includes: "../_includes", // твои layout'ы лежат в корне
      data: "../_data",         // данные тоже в корне
      output: "_site"
    }
  };
};

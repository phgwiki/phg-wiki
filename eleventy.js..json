const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
  const mdLib = markdownIt({ html: true, linkify: true })
    .use(markdownItFootnote);

  eleventyConfig.setLibrary("md", mdLib);
};
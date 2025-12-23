const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
  const mdLib = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", mdLib);

  // ✅ Пропуск ассетов
  eleventyConfig.addPassthroughCopy("assets");

  // ✅ Фильтр: найти индекс текущей страницы в коллекции
  eleventyConfig.addFilter("findIndex", function(arr, page) {
    if (!Array.isArray(arr) || !page) return -1;
    return arr.findIndex(item => item.url === page.url);
  });

  // ✅ Коллекция глав: берём только type: chapter и сортируем по order
  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/**/*.md")
      .filter(item => item.data && item.data.type === "chapter")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    }
  };
};

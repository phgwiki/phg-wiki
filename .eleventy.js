const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  // Markdown: разрешаем HTML + сноски
  const mdLib = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItFootnote);

  eleventyConfig.setLibrary("md", mdLib);

  // Коллекция всех глав (в правильном порядке) — нужна для prev/next
  eleventyConfig.addCollection("chapters", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("**/*.md")
      .filter(
        (item) =>
          item.data &&
          item.data.type === "chapter" &&
          typeof item.data.order !== "undefined"
      )
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Группировка глав по томам (volume -> array of chapters)
  eleventyConfig.addCollection("chaptersByVolume", function (collectionApi) {
    const chapters = collectionApi
      .getFilteredByGlob("**/*.md")
      .filter(
        (item) =>
          item.data &&
          item.data.type === "chapter" &&
          item.data.volume
      );

    const grouped = {};
    for (const ch of chapters) {
      const v = ch.data.volume;
      if (!grouped[v]) grouped[v] = [];
      grouped[v].push(ch);
    }

    // сортируем внутри тома по order
    Object.values(grouped).forEach((arr) =>
      arr.sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
    );

    return grouped;
  });

  // Nunjucks filter: find index of current page within a collection
  eleventyConfig.addNunjucksFilter("findIndex", function (collection, page) {
    if (!Array.isArray(collection) || !page || !page.url) return -1;
    return collection.findIndex((item) => item && item.url === page.url);
  });

  // Статика (если есть папка assets в корне репо)
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};

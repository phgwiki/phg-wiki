const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
  // Группировка глав по томам
eleventyConfig.addCollection("chaptersByVolume", function (collectionApi) {
  const chapters = collectionApi.getFilteredByGlob("**/*.md")
    .filter(item => item.data && item.data.type === "chapter" && item.data.volume);

  const grouped = {};
  for (const ch of chapters) {
    const v = ch.data.volume;
    if (!grouped[v]) grouped[v] = [];
    grouped[v].push(ch);
  }

  // сортируем внутри тома по order
  Object.values(grouped).forEach(arr =>
    arr.sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  return grouped;
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

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addFilter("toMillis", (dateObj) => {
    if (!dateObj) return 0;
    if (dateObj === "now") {
      return DateTime.now().setZone("America/Denver").startOf("day").toMillis();
    }
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toMillis();
    }
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj).toMillis();
    }
    return 0;
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};

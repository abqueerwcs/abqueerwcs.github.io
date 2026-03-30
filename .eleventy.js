const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");

  // existing date formatter
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toFormat(format);
    }
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // timestamp filter for comparisons
  eleventyConfig.addFilter("toMillis", (dateObj) => {
      const { DateTime } = require("luxon");

      if (!dateObj) return 0;

      if (dateObj === "now") {
        return DateTime.now().toMillis();
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

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");

  // Add date filter
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";

    // Handle string dates (from JSON)
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toFormat(format);
    }

    // Handle JS Date objects
    return DateTime.fromJSDate(dateObj).toFormat(format);
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

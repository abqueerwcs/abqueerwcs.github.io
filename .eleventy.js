module.exports = function (eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};

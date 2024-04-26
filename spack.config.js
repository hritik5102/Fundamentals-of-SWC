const { config } = require("@swc/core/spack");

// If you want auto-completion or type checking for configuration, you can wrap the export with a config function from @swc/core/spack. It's an identity function with type annotation.

module.exports = config({
  entry: {
    web: __dirname + "/src/index.js",
  },
  output: {
    path: __dirname + "/dist",
  },
  options: {
    minify: true,
  },
});

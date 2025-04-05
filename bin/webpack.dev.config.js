// webpack.dev.config.js
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  mode: "production",
  devtool: false,
  output: {
    ...defaultConfig.output,
    clean: false, // Disable cleaning of the build folder during development
  },
};

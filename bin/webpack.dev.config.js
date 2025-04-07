// webpack.dev.config.js
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
  mode: "development",
  devtool: false,
  output: {
    ...defaultConfig.output,
    clean: true,
  },
};

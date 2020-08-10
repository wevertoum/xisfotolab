const path = require("path");
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const { getLessVars } = require("antd-theme-generator");

const defaultVars = getLessVars(
  "./node_modules/antd/lib/style/themes/default.less"
);
const options = {
  stylesDir: path.join(__dirname, "./src/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  varFile: path.join(__dirname, "./src/styles/theme.less"),
  mainLessFile: path.join(__dirname, "./src/styles/global.less"),
  themeVariables: Array.from(
    new Set(["@primary-color", "@secondary-color", ...Object.keys(defaultVars)])
  ),
  generateOnce: false, // generate color.less on each compilation
};

const isOmni = process.env.REACT_APP_EMPRESA === "omni";

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // change importing css to less
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#00A8FF",
      "@secondary-color": "#2a5e9c",
    },
  })
);

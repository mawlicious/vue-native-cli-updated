/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require("@expo/metro-config");

 module.exports = (async () => {
   let config = getDefaultConfig(__dirname);
   config.transformer.babelTransformerPath = require.resolve("./vueTransformerPlugin.js"),
   config.transformer.getTransformOptions = async () => ({
     transform: {
       experimentalImportSupport: false,
       inlineRequires: false,
     },
   })
   config.resolver.sourceExts.push("vue");
   return config;
 })();
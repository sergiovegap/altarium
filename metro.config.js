// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");
// const path = require("path");

// const config = getDefaultConfig(__dirname);

// config.resolver.nodeModulesPaths = [
//     path.resolve(__dirname, "./node_modules"),
// ];

// config.watchFolders = [path.resolve(__dirname, "../../")];

// module.exports = withNativeWind(config, { input: "./src/global.css" });

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./src/global.css" });

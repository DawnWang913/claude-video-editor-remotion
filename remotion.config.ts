import path from "node:path";
import { Config } from "@remotion/cli/config";
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(18);

// Project-local Studio translations; video compositions and package files are untouched.
Config.overrideBundlerConfig((config) => {
  config.module ??= {};
  config.module.rules ??= [];
  config.module.rules.push({
    test: /[\\/]@remotion[\\/]studio[\\/]dist[\\/].*\.m?js$/,
    enforce: "pre",
    use: [{ loader: path.resolve("tools/studio-zh-loader.cjs") }],
  });
  return config;
});

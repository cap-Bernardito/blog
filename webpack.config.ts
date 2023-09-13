import path from "path";

import { buildWebpackConfig } from "./config/build/build_webpack_config";

const mode = "development";
const isDev = mode === "development";

const config = buildWebpackConfig({
  mode: "development",
  isDev,
  paths: {
    dist: path.resolve(__dirname, "dist"),
    entry: "./src/index.ts",
    html: path.resolve(__dirname, "public", "index.html"),
  },
});

export default config;

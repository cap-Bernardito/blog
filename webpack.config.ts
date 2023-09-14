import path from "path";

import { buildWebpackConfig } from "./config/build/build_webpack_config";
import { BuildEnv } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const isDev = env.mode === "development";
  const port = (env.port as number) || 3000;

  return buildWebpackConfig({
    mode: env.mode,
    isDev,
    devtool: isDev ? "inline-source-map" : false,
    paths: {
      dist: path.resolve(__dirname, "dist"),
      entry: "./src/index.tsx",
      html: path.resolve(__dirname, "public", "index.html"),
    },
    port,
  });
};

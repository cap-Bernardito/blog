import dotenv from "dotenv";
import path from "path";

import { buildWebpackConfig } from "./config/build/build_webpack_config";
import { BuildEnv } from "./config/build/types/config";

dotenv.config();

export default (env: BuildEnv) => {
  const isDev = env.mode === "development";

  const pathDist = path.resolve(__dirname, "dist");
  const publicDist = path.resolve(__dirname, "public");

  return buildWebpackConfig({
    mode: env.mode,
    isDev,
    devtool: isDev ? "inline-source-map" : false,
    paths: {
      dist: pathDist,
      entry: "./src/index.tsx",
      html: path.resolve(publicDist, "index.html"),
      src: path.resolve(__dirname, "src"),
      env: path.resolve(__dirname, ".env"),
      locales: path.resolve(publicDist, "locales"),
      buildLocales: path.resolve(pathDist, "locales"),
    },
    port: Number(process.env.CLIENT_PORT),
  });
};

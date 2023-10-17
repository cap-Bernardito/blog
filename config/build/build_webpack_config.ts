import webpack from "webpack";

import { BuildOptions } from "./types/config";
import { buildDevServer } from "./build_dev_server";
import { buildLoaders } from "./build_loaders";
import { buildPlugins } from "./build_plugins";
import { buildResolvers } from "./build_resolvers";

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths, devtool } = options;

  return {
    mode,
    entry: paths.entry,
    devtool,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.dist,
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devServer: buildDevServer(options),
  };
};

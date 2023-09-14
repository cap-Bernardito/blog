import webpack from "webpack";

import { buildLoaders } from "./build_loaders";
import { buildPlugins } from "./build_plugins";
import { buildResolvers } from "./build_resolvers";
import { buildDevServer } from "./build_dev_server";

import { BuildOptions } from "./types/config";

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
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(options),
    devServer: buildDevServer(options),
  };
};

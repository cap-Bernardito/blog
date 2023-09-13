import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { BuildOptions } from "./types/config";

export const buildPlugins = ({ paths }: BuildOptions): webpack.WebpackPluginInstance[] => [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    template: paths.html,
  }),
];

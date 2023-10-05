import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import StatoscopeWebpackPlugin from "@statoscope/webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore, В пакете @types/dotenv-webpack неверные типы опций
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { WebpackPluginInstance } from "webpack";

import type { BuildOptions } from "./types/config";

export const buildPlugins = ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] =>
  [
    new webpack.ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: paths.html,
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),

    new webpack.DefinePlugin({
      __IS_DEV__: isDev,
    }),

    isDev &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),

    !isDev &&
      new StatoscopeWebpackPlugin({
        compressor: false,
      }),

    new CopyPlugin({
      patterns: [{ from: paths.locales, to: paths.buildLocales }],
    }),

    new Dotenv({
      path: paths.env,
      prefix: "import.meta.env.",
    }),
  ].filter(Boolean) as WebpackPluginInstance[];

import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
  const svgUrlLoader: webpack.RuleSetRule = {
    test: /\.svg$/i,
    type: "asset",
    resourceQuery: /url/, // *.svg?url
  };

  const svgrLoader: webpack.RuleSetRule = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
    use: ["@svgr/webpack"],
  };

  const resourceLoader: webpack.RuleSetRule = {
    test: /\.(png|jpg|gif)$/i,
    type: "asset/resource",
  };

  const tsLoader: webpack.RuleSetRule = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const scssLoader: webpack.RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: true,
            localIdentName: options.isDev ? "[name]__[local]_[hash:base64:4]" : "[hash:base64:6]",
          },
        },
      },
      "sass-loader",
    ],
  };

  return [tsLoader, scssLoader, svgUrlLoader, svgrLoader, resourceLoader];
};

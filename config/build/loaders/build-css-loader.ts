import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { BuildOptions } from "../types/config";

export const buildCssLoader = ({ isDev }: Pick<BuildOptions, "isDev">) => {
  return {
    test: /\.((c|sa|sc)ss)$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: true,
            localIdentName: isDev ? "[name]__[local]_[hash:base64:4]" : "[hash:base64:6]",
          },
        },
      },
      "sass-loader",
    ],
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore, В пакете @types/dotenv-webpack неверные типы опций
import Dotenv from "dotenv-webpack";
import path from "path";
import webpack from "webpack";

import { buildCssLoader } from "../build/loaders/build-css-loader";
import { BuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    dist: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
    env: path.resolve(__dirname, "..", "..", ".env"),
    locales: "",
    buildLocales: "",
  };

  if (typeof config === "undefined") {
    return {};
  }

  config.resolve?.modules?.unshift(paths.src);
  config.resolve?.extensions?.push(".ts", ".tsx");

  config.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: true,
    }),
    new Dotenv({
      path: paths.env,
      prefix: "import.meta.env.",
    }),
  );

  if (typeof config.module?.rules === "undefined") {
    return config;
  }

  config.module.rules = config.module.rules.map((rule) => {
    if (!rule || rule === "...") {
      return rule;
    }

    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module.rules?.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });

  config.module.rules?.push(buildCssLoader({ isDev: true }));

  return config;
};

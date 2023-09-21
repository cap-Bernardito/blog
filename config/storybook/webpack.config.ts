import path from "path";
import webpack, { RuleSetRule } from "webpack";
import { BuildPaths } from "../build/types/config";
import { buildCssLoader } from "../build/loaders/build-css-loader";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    dist: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
    locales: "",
    buildLocales: "",
  };

  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push(".ts", ".tsx");

  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });

  config.module.rules.push(buildCssLoader({ isDev: true }));

  config.plugins.push(
    new webpack.DefinePlugin({
      __IS_DEV__: true,
    }),
  );

  return config;
};

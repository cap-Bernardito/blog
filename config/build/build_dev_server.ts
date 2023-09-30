import { Configuration as DevServerConfiguration } from "webpack-dev-server";

import type { BuildOptions } from "./types/config";

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => {
  const { port } = options;

  return {
    port,
    open: false,
    historyApiFallback: true,
  };
};

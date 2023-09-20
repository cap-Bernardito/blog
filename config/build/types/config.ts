export type BuildMode = "development" | "production";

export type BuildPaths = {
  entry: string;
  dist: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
};

export type BuildEnv = {
  port: number;
  mode: BuildMode;
};

export type BuildOptions = {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  devtool: string | false;
  port: number;
};

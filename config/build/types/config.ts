export type BuildMode = "development" | "production";

export type BuildPaths = {
  entry: string;
  dist: string;
  html: string;
};

export type BuildOptions = {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
};

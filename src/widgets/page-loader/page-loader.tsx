import cn from "classnames";
import React from "react";

import { Loader } from "shared/ui/loader/loader";

import css from "./page-loader.module.scss";

type PageLoaderProps = {
  className?: string;
};

export const PageLoader: React.FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className={cn(css.root, className)}>
      <Loader />
    </div>
  );
};

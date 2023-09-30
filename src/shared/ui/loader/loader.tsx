import cn from "classnames";
import React from "react";

import "./loader.scss";

type LoaderProps = {
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <div className={cn("lds-ellipsis", className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

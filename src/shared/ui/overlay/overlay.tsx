import cn from "classnames";
import React from "react";

import css from "./overlay.module.scss";

type OverlayProps = {
  className?: string;
};

export const Overlay: React.FC<OverlayProps> = ({ className }) => <div className={cn(css.root, className)}></div>;

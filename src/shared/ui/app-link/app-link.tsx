import React from "react";
import { Link, LinkProps } from "react-router-dom";
import cn from "classnames";
import css from "./app-link.module.scss";

export enum AppLinkColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type AppLinkProps = LinkProps & {
  className?: string;
  color?: AppLinkColor;
};

export const AppLink: React.FC<React.PropsWithChildren<AppLinkProps>> = (props) => {
  const { to, className, children, color = AppLinkColor.PRIMARY, ...otherProps } = props;

  return (
    <Link className={cn(css.root, className, css[color])} to={to} {...otherProps}>
      {children}
    </Link>
  );
};

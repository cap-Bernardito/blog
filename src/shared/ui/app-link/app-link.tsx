import cn from "classnames";
import React from "react";
import { LinkProps, NavLink } from "react-router-dom";

import css from "./app-link.module.scss";

export enum AppLinkColor {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

type AppLinkProps = LinkProps & {
  className?: string;
  color?: AppLinkColor;
};

export const AppLink: React.FC<React.PropsWithChildren<AppLinkProps>> = (props) => {
  const { to, className, children, color = AppLinkColor.DEFAULT, ...otherProps } = props;

  return (
    <NavLink
      className={({ isActive }) => cn(css.root, className, css[color], isActive && css.active)}
      to={to}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
};

import cn from "classnames";
import React, { useMemo } from "react";

import { useAppSelector } from "app/app-store";

import { userSelectors } from "entities/user";

import { SidebarItemsList } from "../../model/nav-items";
import { SidebarNavItem } from "../sidebar-nav-item/sidebar-nav-item";

import css from "./sidebar-nav.module.scss";

type SidebarNavProps = {
  className?: string;
  collapsed?: boolean;
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ className, collapsed }) => {
  const isAuth = useAppSelector(userSelectors.getAuthData);
  const navItems = useMemo(
    () =>
      SidebarItemsList.map(({ privateRoute, ...otherProps }) => {
        if (privateRoute && !isAuth) {
          return null;
        }

        return (
          <SidebarNavItem
            className={css.nav__item}
            key={otherProps.title}
            collapsed={collapsed}
            item={{ ...otherProps }}
          />
        );
      }),
    [collapsed, isAuth],
  );

  return (
    <div className={cn(css.root, className)}>
      <ul className={cn(css.root__nav, css.nav__list, { [css["collapsed"]]: collapsed })}>{navItems}</ul>
    </div>
  );
};

import cn from "classnames";
import React, { useMemo } from "react";

import { SidebarItemsList } from "../../model/nav-items";
import { SidebarNavItem } from "../sidebar-nav-item/sidebar-nav-item";

import css from "./sidebar-nav.module.scss";

type SidebarNavProps = {
  className?: string;
  collapsed?: boolean;
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ className, collapsed }) => {
  const navItems = useMemo(
    () =>
      SidebarItemsList.map((props) => (
        <SidebarNavItem className={css.nav__item} key={props.title} collapsed={collapsed} item={{ ...props }} />
      )),
    [collapsed],
  );

  return (
    <div className={cn(css.root, className)}>
      <ul className={cn(css.root__nav, css.nav__list, { [css["collapsed"]]: collapsed })}>{navItems}</ul>
    </div>
  );
};

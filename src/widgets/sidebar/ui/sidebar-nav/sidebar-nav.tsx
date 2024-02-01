import cn from "classnames";

import { withAuth } from "entities/session";

import { SidebarItemsList } from "../../model/nav-items";
import { SidebarNavItem } from "../sidebar-nav-item/sidebar-nav-item";

import css from "./sidebar-nav.module.scss";

type SidebarNavProps = {
  className?: string;
  collapsed?: boolean;
};

const SidebarNavItems = withAuth({
  Authorized: ({ collapsed }) => (
    <>
      {SidebarItemsList.map((item) => (
        <SidebarNavItem className={css.nav__item} key={item.title} collapsed={Boolean(collapsed)} item={{ ...item }} />
      ))}
    </>
  ),
  UnAuthorized: ({ collapsed }) => (
    <>
      {SidebarItemsList.filter(({ privateRoute }) => !privateRoute).map((item) => (
        <SidebarNavItem className={css.nav__item} key={item.title} collapsed={Boolean(collapsed)} item={{ ...item }} />
      ))}
    </>
  ),
});

export const SidebarNav: React.FC<SidebarNavProps> = ({ className, collapsed }) => (
  <div className={cn(css.root, className)}>
    <ul className={cn(css.root__nav, css.nav__list, { [css["collapsed"]]: collapsed })}>
      <SidebarNavItems collapsed={collapsed} />
    </ul>
  </div>
);

import cn from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { AppLink } from "shared/ui/app-link";

import { SidebarNavItemType } from "../../model/nav-items";

import css from "./sidebar-nav-item.module.scss";

type SidebarNavItemProps = {
  className?: string;
  collapsed: boolean;
  item: SidebarNavItemType;
};

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ className, item, collapsed }) => {
  const { t } = useTranslation();

  return (
    <li className={cn(css.root, className, { [css["collapsed"]]: collapsed })}>
      <AppLink to={item.path} className={css.link}>
        <item.Icon className={css.link__icon} width={32} height={32} viewBox="0 0 32 32" />
        <span className={css.link__title}>{t(item.title)}</span>
      </AppLink>
    </li>
  );
};

import cn from "classnames";
import React, { useState } from "react";

import { useAppSelector } from "app/app-store";

import { LangSwitcher } from "features/lang-switcher";
import { ThemeButton } from "features/theme-switcher";

import { userSelectors } from "entities/user";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

import ArrowBottom from "shared/assets/icons/arrow-bottom.svg";

import { SidebarNav } from "../sidebar-nav/sidebar-nav";

import css from "./sidebar-main.module.scss";

type SidebarMainProps = {
  className?: string;
  isNarrow?: boolean;
};

export const SidebarMain: React.FC<SidebarMainProps> = ({ className, isNarrow = false }) => {
  const [collapsed, setCollapsed] = useState(isNarrow);
  const user = useAppSelector(userSelectors.getAuthData);

  return (
    <div className={cn(css.root, className, { [css["collapsed"]]: collapsed })} data-testid="sidebar">
      {user && !collapsed && <div className={cn(css.root__userinfo)}>{user.username}</div>}
      <nav className={cn(css.root__main)}>
        <SidebarNav collapsed={collapsed} />
      </nav>
      <div className={cn(css.root__toggle)}>
        <Button
          className={css.root__toggle_btn}
          data-testid="sidebar-toggle"
          variant={ButtonVariant.ICON}
          color={ButtonColor.SECONDARY}
          onClick={() => setCollapsed((state) => !state)}
          title="Переключить сайдбар"
        >
          <ArrowBottom className={css.root__toggle_icon} width={32} height={32} viewBox="0 0 32 32" />
        </Button>
      </div>
      <div className={cn(css.root__switchers)}>
        <div className={cn(css.root__switchers_inner)}>
          <ThemeButton />
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
};

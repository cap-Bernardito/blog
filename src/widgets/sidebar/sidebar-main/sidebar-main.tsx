import React, { useState } from "react";
import cn from "classnames";
import { ThemeButton } from "features/theme-switcher";
import { LangSwitcher } from "features/lang-switcher";
import { LoginModalButton } from "features/auth-by-username";
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

  return (
    <aside className={cn(css.root, className, { [css["collapsed"]]: collapsed })} data-testid="sidebar">
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
          <LoginModalButton />
          <ThemeButton />
          <LangSwitcher />
        </div>
      </div>
    </aside>
  );
};

import React, { useState } from "react";
import cn from "classnames";
import { ThemeButton } from "features/theme-switcher";
import { LangSwitcher } from "features/lang-switcher";
import { Button, ButtonVariant } from "shared/ui/button";
import ArrowBottom from "shared/assets/icons/arrow-bottom.svg";
import css from "./sidebar-main.module.scss";
import { SidebarNav } from "../sidebar-nav/sidebar-nav";

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
    </aside>
  );
};

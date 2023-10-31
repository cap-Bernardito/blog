import cn from "classnames";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import css from "./layout.module.scss";

type LayoutProps = {
  footerSlot?: ReactNode;
  sidebarLeftSlot?: ReactNode;
  sidebarRightSlot?: ReactNode;
  controlsSlot?: ReactNode;
  toolsSlot?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { footerSlot, sidebarLeftSlot, sidebarRightSlot, controlsSlot, toolsSlot } = props;

  return (
    <div className={cn(css.root)}>
      <div className={cn(css["sidebar-left"])}>
        <div className={cn(css["sidebar-left__inner"])}>{sidebarLeftSlot}</div>
      </div>

      <div className={css.controls}>
        <div className={cn(css["controls__inner"])}>{controlsSlot}</div>
      </div>

      <main className={cn(css.main)}>
        <Outlet />
      </main>

      <aside className={css.sidebar__right}>{sidebarRightSlot}</aside>

      <div className={css.tools}>{toolsSlot}</div>

      <footer className={css.footer}>{footerSlot}</footer>
    </div>
  );
};

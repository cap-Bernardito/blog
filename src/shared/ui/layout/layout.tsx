import cn from "classnames";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import css from "./layout.module.scss";

type LayoutProps = {
  className?: string;
  headerSlot: ReactNode;
  bottomSlot?: ReactNode;
  sidebarSlot?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { className, headerSlot, bottomSlot, sidebarSlot } = props;

  return (
    <div className={cn(css.root, className)}>
      <header className={cn(css.header)}>{headerSlot}</header>

      <div className={css.content}>
        <aside className={cn(css.content__sidebar)}>{sidebarSlot}</aside>

        <main className={cn(css.content__main)}>
          <Outlet />
        </main>
      </div>

      <footer className={css.footer}>{bottomSlot}</footer>
    </div>
  );
};

{
  /* <div className={cn(css.root, className)}>
      <header>{headerSlot}</header>

      <div className="content">
        <aside className="content__sidebar">{sidebarSlot}</aside>
        <main className="content__main">
          <Outlet />
        </main>
      </div>

      <footer className={css.footer}>
        {bottomSlot}
      </footer>
    </div> */
}

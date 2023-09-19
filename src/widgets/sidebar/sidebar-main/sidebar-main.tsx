import React, { useState } from "react";
import cn from "classnames";
import { ThemeButton } from "features/theme-switcher";
import css from "./sidebar-main.module.scss";

type SidebarMainProps = {
  className?: string;
};

export const SidebarMain: React.FC<SidebarMainProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(css.root, className, { [css["collapsed"]]: collapsed })}>
      <div className={cn(css.root__main)}>
        Sidebar
        <br />
        <button onClick={() => setCollapsed((state) => !state)}>Сжать сайдбар</button>
      </div>
      <div className={cn(css.root__switchers)}>
        <ThemeButton />
      </div>
    </div>
  );
};

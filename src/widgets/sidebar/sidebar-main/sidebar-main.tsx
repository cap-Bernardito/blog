import React, { useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { ThemeButton } from "features/theme-switcher";
import { LangSwitcher } from "features/lang-switcher";
import css from "./sidebar-main.module.scss";

type SidebarMainProps = {
  className?: string;
};

export const SidebarMain: React.FC<SidebarMainProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={cn(css.root, className, { [css["collapsed"]]: collapsed })}>
      <div className={cn(css.root__main)}>
        {t("Сайдбар")}
        <br />
        <button onClick={() => setCollapsed((state) => !state)}>{t("Сжать сайдбар")}</button>
      </div>
      <div className={cn(css.root__switchers)}>
        <ThemeButton />
        <LangSwitcher />
      </div>
    </div>
  );
};

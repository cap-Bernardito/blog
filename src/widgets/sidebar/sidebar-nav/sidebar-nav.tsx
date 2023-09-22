import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import css from "./sidebar-nav.module.scss";
import { AppLink } from "shared/ui/app-link";
import Home from "shared/assets/icons/home.svg";
import Info from "shared/assets/icons/Info.svg";

type SidebarNavProps = {
  className?: string;
  collapsed?: boolean;
};

export const SidebarNav: React.FC<SidebarNavProps> = ({ className, collapsed }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(css.root, className)}>
      <ul className={cn(css.root__nav, css.nav__list, { [css["collapsed"]]: collapsed })}>
        <li className={cn(css.nav__item)}>
          <AppLink to="/" className={css.link}>
            <Home className={css.link__icon} width={32} height={32} viewBox="0 0 32 32" />
            <span className={css.link__title}>{t("Главная")}</span>
          </AppLink>
        </li>
        <li className={cn(css.nav__item)}>
          <AppLink to="/about" className={css.link}>
            <Info className={css.link__icon} width={32} height={32} viewBox="0 0 32 32" />
            <span className={css.link__title}>{t("О нас")}</span>
          </AppLink>
        </li>
      </ul>
    </div>
  );
};

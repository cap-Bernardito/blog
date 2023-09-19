import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { AppLink } from "shared/ui/app-link";
import css from "./navbar.module.scss";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(css.root, className)}>
      <div className={cn(css.links)}>
        <AppLink to="/" className={css.mainLink}>
          {t("Главная")}
        </AppLink>
        <AppLink to="/about">{t("О нас")}</AppLink>
      </div>
    </div>
  );
};

import React from "react";
import cn from "classnames";
import css from "./navbar.module.scss";
import { AppLink } from "shared/ui/app-link";

type NavbarProps = {
  className?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={cn(css.root, className)}>
      <div className={cn(css.links)}>
        <AppLink to="/" className={css.mainLink}>
          Главная
        </AppLink>
        <AppLink to="/about">О нас</AppLink>
      </div>
    </div>
  );
};

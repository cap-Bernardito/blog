import React from "react";
import cn from "classnames";
import "shared/config/i18n/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/button";
import css from "./lang-switcher.module.scss";

type LangSwitcherProps = {
  className?: string;
};

export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className={cn(css.root, className)}
      onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}
    >
      {t("Переключить язык")}
    </Button>
  );
};

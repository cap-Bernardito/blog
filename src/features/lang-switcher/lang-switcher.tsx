import React from "react";
import cn from "classnames";
import "shared/config/i18n/i18n";
import { useTranslation } from "react-i18next";
import { Button, ButtonVariant } from "shared/ui/button";

type LangSwitcherProps = {
  className?: string;
};

export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className={cn(className)}
      variant={ButtonVariant.ICON}
      onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}
      title={`Переключить язык на ${t("RU")}`}
    >
      {t("RU")}
    </Button>
  );
};

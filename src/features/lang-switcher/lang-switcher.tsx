import cn from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

import "shared/config/i18n/i18n";

type LangSwitcherProps = {
  className?: string;
};

export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      className={cn(className)}
      variant={ButtonVariant.CLEAR}
      color={ButtonColor.SECONDARY}
      onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}
      title={`Переключить язык на ${t("RU")}`}
    >
      <b>{t("RU")}</b>
    </Button>
  );
};

import cn from "classnames";
import { useTranslation } from "react-i18next";

import css from "./not-found-page.module.scss";

import "shared/config/i18n/i18n";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return <div className={cn(css.root)}>{t("404")}</div>;
};

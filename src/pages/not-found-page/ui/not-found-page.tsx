import { useTranslation } from "react-i18next";
import "shared/config/i18n/i18n";
import cn from "classnames";
import css from "./not-found-page.module.scss";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return <div className={cn(css.root)}>{t("404")}</div>;
};

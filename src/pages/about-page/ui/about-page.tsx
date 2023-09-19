import { useTranslation } from "react-i18next";
import "shared/config/i18n/i18n";

export const AboutPage = () => {
  const { t } = useTranslation("about");

  return <div>{t("Страница о нас")}</div>;
};

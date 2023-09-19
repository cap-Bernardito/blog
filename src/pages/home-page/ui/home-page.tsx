import { useTranslation } from "react-i18next";
import "shared/config/i18n/i18n";

export const HomePage = () => {
  const { t } = useTranslation("home");

  return <div>{t("Главная страница")}</div>;
};

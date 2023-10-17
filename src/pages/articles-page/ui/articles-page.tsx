import { useTranslation } from "react-i18next";

export const ArticlesPage = () => {
  const { t } = useTranslation();

  return <div>{t("Статьи")}</div>;
};

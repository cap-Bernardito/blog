import { useTranslation } from "react-i18next";

import "shared/config/i18n/i18n";

export const ProfilePage = () => {
  const { t } = useTranslation("profile");

  return <div>{t("Профиль")}</div>;
};

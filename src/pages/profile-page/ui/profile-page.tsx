import { useTranslation } from "react-i18next";

import { useAppSelector } from "app/app-store";

import { userSelectors } from "entities/user";

import "shared/config/i18n/i18n";

export const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const user = useAppSelector(userSelectors.getUserData);

  return (
    <div>
      {t("Профиль")}
      <div>
        {user &&
          Object.entries(user).map(([k, val]) => (
            <div key={k}>
              {k}: {val}
            </div>
          ))}
      </div>
    </div>
  );
};

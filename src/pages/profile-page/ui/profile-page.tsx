import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { fetchProfileData, profileSelectors } from "entities/profile";
import { profileReducer } from "entities/profile";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";

import "shared/config/i18n/i18n";

const asyncProfileReducer: AsyncReducersList = { profile: profileReducer };

export const ProfilePage = () => {
  const { t } = useTranslation("profile");
  const user = useAppSelector(profileSelectors.getProfileData);
  const dispatch = useAppDispatch();

  useAsyncReducerLoader(asyncProfileReducer);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

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

import { useTranslation } from "react-i18next";

import { useAppSelector } from "app/app-store";

import { OpenLoginModal } from "widgets/login-modal";

import { LoginButtonText } from "entities/login-button";
import { sessionSelectors } from "entities/session";

import "shared/config/i18n/i18n";

export const HomePage = () => {
  const isAuth = useAppSelector(sessionSelectors.isAuth);
  const { t } = useTranslation("home");

  return (
    <div>
      {t("Главная страница")}
      {isAuth ? null : (
        <>
          <p>
            Для просмотра материалов{" "}
            <OpenLoginModal
              LoginButton={({ ...props }) => (
                <LoginButtonText variant="clear" color="secondary" {...props}>
                  авторизируйтесь
                </LoginButtonText>
              )}
            />{" "}
            на сайте. <br />
          </p>
          <p>Демо доступ:</p>
          <blockquote>
            <b>Login:</b> admin / user; <br /> <b>Password:</b> 123
          </blockquote>
        </>
      )}
    </div>
  );
};

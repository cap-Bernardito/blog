import { useTranslation } from "react-i18next";

import { OpenLoginModal } from "widgets/login-modal";

import { LoginButtonText } from "entities/login-button";
import { withAuth } from "entities/session";

import "shared/config/i18n/i18n";

const UserGreeting = withAuth({
  fallback: <p>Авторизация...</p>,
  Authorized: ({ viewer }) => <p> Привет, {viewer.first} </p>,
  UnAuthorized: () => (
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
  ),
});

export const HomePage = () => {
  const { t } = useTranslation("home");

  return (
    <div>
      {t("Главная страница")}
      <UserGreeting />
    </div>
  );
};

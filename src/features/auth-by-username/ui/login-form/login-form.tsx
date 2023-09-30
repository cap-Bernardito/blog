import React, { useCallback } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";
import { loginByUsername } from "../../model/services/login-by-username";
import { loginActions } from "../../model/slice/login-slice";
import { getLoginState } from "../../model/selectors";
import { useAppSelector, useAppDispatch } from "app/app-store";
import css from "./login-form.module.scss";

type LoginFormProps = {
  className?: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();
  const { username, password, error, isLoading } = useAppSelector(getLoginState);
  const dispatch = useAppDispatch();

  const handleLoginChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      dispatch(loginActions.setUsername(event.target.value));
      dispatch(loginActions.resetError());
    },
    [dispatch],
  );

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      dispatch(loginActions.setPassword(event.target.value));
      dispatch(loginActions.resetError());
    },
    [dispatch],
  );

  const handleSubmitForm: React.FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      dispatch(loginByUsername({ username, password }));
    },
    [dispatch, password, username],
  );

  return (
    <form className={cn(css.root, className)} action="" noValidate autoComplete="off" onSubmit={handleSubmitForm}>
      <Input label="Логин" id="login" value={username} onChange={handleLoginChange} aria-describedby="info" required />
      <Input
        label="Пароль"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        aria-describedby="info"
        required
      />

      <div
        className={cn(css.root__info, { [css.active]: isLoading || error, [css.error]: error })}
        id="info"
        aria-live="assertive"
      >
        {error ? error : isLoading ? t("Получение данных") : ""}
      </div>

      <Button className={cn(css.root__button)} disabled={isLoading}>
        {t("Войти")}
      </Button>
    </form>
  );
};

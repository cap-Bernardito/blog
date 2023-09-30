import cn from "classnames";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

import { getLoginState } from "../../model/selectors";
import { loginByUsername } from "../../model/services/login-by-username";

import css from "./login-form.module.scss";

type LoginFormProps = {
  className?: string;
};

type IFormInputs = {
  login: string;
  password: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();
  const { error, isLoading } = useAppSelector(getLoginState);
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const handleSubmitForm: SubmitHandler<IFormInputs> = ({ login, password }) => {
    dispatch(loginByUsername({ username: login, password }));
  };

  return (
    <form
      className={cn(css.root, className)}
      action=""
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Controller
        name="login"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <Input {...field} label="Логин" id="login" aria-describedby="info" />}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} type="password" label="Пароль" id="password" aria-describedby="info" />
        )}
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

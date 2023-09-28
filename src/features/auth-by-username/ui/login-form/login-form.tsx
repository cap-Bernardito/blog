import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/input";
import { Button } from "shared/ui/button";
import css from "./login-form.module.scss";

type LoginFormProps = {
  className?: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <form className={cn(css.root, className)} action="" autoComplete="off">
      <Input label="Логин" id="login" value="" required />
      <Input label="Пароль" id="password" value="" required />
      <Button className={cn(css.root__button)}>{t("Войти")}</Button>
    </form>
  );
};

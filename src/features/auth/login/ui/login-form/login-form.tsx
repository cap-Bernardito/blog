import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import { useCallback } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { routePaths } from "app/app-router/app-router-config";
import { useAppDispatch } from "app/app-store";

import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

import { fields } from "../../model/form-fields";
import { loginByUsername } from "../../model/services/login-by-username";
import { LoginFormSchema, loginFormSchema } from "../../model/types/login-schema";

import css from "./login-form.module.scss";

export type LoginFormProps = {
  className?: string;
  onSuccess: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ className, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const formError = errors?.root?.message;

  const handleSubmitForm: SubmitHandler<LoginFormSchema> = useCallback(
    async ({ username, password }) => {
      try {
        await dispatch(loginByUsername({ username, password })).unwrap();
        reset();
        onSuccess();
        navigate(routePaths.profile);
      } catch (error) {
        if (typeof error === "string") {
          setError("root", { message: error });
        }
      }
    },
    [dispatch, navigate, onSuccess, reset, setError],
  );

  const fieldsList = fields.map((item) => (
    <Controller
      key={item.name}
      name={item.name}
      control={control}
      render={({ field }) => (
        <Input {...field} type={item.type} label={item.label} id={field.name} error={errors[field.name]?.message} />
      )}
    />
  ));

  return (
    <form
      className={cn(css.root, className)}
      action=""
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleSubmitForm)}
      aria-label="Авторизация"
    >
      {fieldsList}

      <div
        className={cn(css.root__info, { [css.active]: isSubmitting || formError, [css.error]: formError })}
        aria-live="assertive"
      >
        {formError ? formError : isSubmitting ? t("Получение данных") : ""}
      </div>

      <Button className={cn(css.root__button)} disabled={!isDirty || isSubmitting}>
        {t("Войти")}
      </Button>
    </form>
  );
};

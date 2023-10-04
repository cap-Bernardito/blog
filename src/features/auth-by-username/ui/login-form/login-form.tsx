import cn from "classnames";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { ReducersList, useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

import { getLoginError, getLoginLoading } from "../../model/selectors";
import { loginByUsername } from "../../model/services/login-by-username";
import { loginReducer } from "../../model/slice/login-slice";

import css from "./login-form.module.scss";

export type LoginFormProps = {
  className?: string;
  onSuccess: () => void;
};

type IFormInputs = {
  login: string;
  password: string;
};

const asyncLoginReducer: ReducersList = { loginForm: loginReducer };

export const LoginForm: React.FC<LoginFormProps> = ({ className, onSuccess }) => {
  const { t } = useTranslation();
  const isLoading = useAppSelector(getLoginLoading);
  const error = useAppSelector(getLoginError);
  const dispatch = useAppDispatch();

  useAsyncReducerLoader(asyncLoginReducer, true);

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const handleSubmitForm: SubmitHandler<IFormInputs> = async ({ login, password }) => {
    const result = await dispatch(loginByUsername({ username: login, password }));

    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
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

import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import React, { useCallback, useEffect, useReducer } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "app/app-store";

import { User } from "entities/user";
import { userFormSchema } from "entities/user/@x/types";

import { Avatar } from "shared/ui/avatar";
import { Button, ButtonColor } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { Select, SelectOption } from "shared/ui/select";

import { selectFormFields } from "../model/selectors";

import css from "./user-form.module.scss";

type UserFormProps = {
  className?: string;
  onSubmit: (formData: User) => Promise<boolean>;
};

export const UserForm: React.FC<UserFormProps> = ({ className, onSubmit }) => {
  const { t } = useTranslation();
  const [editableForm, toggleEditableForm] = useReducer((v) => !v, false);
  const formFields = useAppSelector(selectFormFields);

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isDirty, isSubmitting, isSubmitSuccessful, errors },
  } = useForm<User>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (formFields.defaults) {
      reset(formFields.defaults);
    }
  }, [formFields.defaults, reset]);

  const handleSubmitForm: SubmitHandler<User> = useCallback(
    async (formData) => {
      try {
        await onSubmit(formData);

        toggleEditableForm();
      } catch (error) {
        if (typeof error === "string") {
          setError("root", { message: error });
          reset();
        }
      }
    },
    [onSubmit, reset, setError],
  );

  const handleEditFormClick: React.MouseEventHandler = useCallback((event) => {
    event.preventDefault();

    toggleEditableForm();
  }, []);

  const handleCancelClick: React.MouseEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      reset();
      toggleEditableForm();
    },
    [reset],
  );

  if (!formFields.all) {
    return null;
  }

  const formError = errors?.root?.message;

  const fieldsList = formFields.all.map((item) => {
    if (item.type === "select") {
      if (typeof item.options === "undefined") {
        return null;
      }

      return (
        <Controller
          defaultValue={item.value}
          key={item.name}
          name={item.name}
          control={control}
          render={({ field }) => (
            <Select {...field} label={item.label} id={field.name} disabled={!editableForm}>
              {item.options!.map((item) => (
                <SelectOption key={item}>{item}</SelectOption>
              ))}
            </Select>
          )}
        />
      );
    }

    return (
      <Controller
        defaultValue={item.value}
        key={item.name}
        name={item.name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={item.type}
            label={item.label}
            id={field.name}
            error={errors[field.name]?.message}
            disabled={!editableForm}
          />
        )}
      />
    );
  });

  const halfCountFields = Math.floor(fieldsList.length / 2);
  const leftColumnFields = fieldsList.slice(0, halfCountFields);
  const rightColumnFields = fieldsList.slice(halfCountFields);

  return (
    <form
      className={cn(css.root, className)}
      action=""
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className={css.header}>
        <div className={cn(css.header__item, css.header__left)}>
          {editableForm && (
            <Button
              className={cn(css.root__button)}
              onClick={handleCancelClick}
              color={ButtonColor.ERROR}
              disabled={isSubmitting}
            >
              {t("Отмена")}
            </Button>
          )}
        </div>
        <div className={cn(css.header__item, css.header__middle)}>
          <Avatar url={formFields.defaults.avatar} size="xl" />
        </div>
        <div className={cn(css.header__item, css.header__right)}>
          {editableForm ? (
            <Button className={cn(css.root__button)} disabled={!isDirty || isSubmitting} color={ButtonColor.SUCCESS}>
              {t("Сохранить")}
            </Button>
          ) : (
            <Button className={cn(css.root__button)} onClick={handleEditFormClick}>
              {t("Редактировать профиль")}
            </Button>
          )}
        </div>
      </div>
      <div className={css.columns}>
        <div className={css.columns__item}>{leftColumnFields}</div>
        <div className={css.columns__item}>{rightColumnFields}</div>
      </div>
      <div
        className={cn(css.root__info, { [css.active]: isSubmitting || formError, [css.error]: formError })}
        aria-live="assertive"
      >
        {formError && formError}
        {isSubmitting && t("Обновление данных")}
        {isSubmitSuccessful && t("Данные обновлены")}
      </div>
    </form>
  );
};

import cn from "classnames";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import FocusLock from "react-focus-lock";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { wait } from "shared/lib/wait";
import { Avatar } from "shared/ui/avatar";
import { Button, ButtonColor } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { Select, SelectOption } from "shared/ui/select";

import { FieldValuesList, FieldValuesWithAvatar, FormFields } from "../types/types";

import css from "./user-form.module.scss";

type UserFormProps = {
  className?: string;
  onSubmit: (formData: FieldValuesList<FieldValuesWithAvatar>) => Promise<boolean>;
  formFields: FormFields<FieldValuesWithAvatar>;
  zodResolver?: Resolver;
};

export const UserForm: React.FC<UserFormProps> = ({ className, onSubmit, formFields, zodResolver }) => {
  const { t } = useTranslation();
  const [editableForm, toggleEditableForm] = useReducer((v) => !v, false);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isDirty, isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver,
  });

  useEffect(() => {
    if (formFields.defaults) {
      reset(formFields.defaults);
    }
  }, [formFields.defaults, reset]);

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      if (editableForm && event.key === "Escape") {
        reset();
        toggleEditableForm();

        // Ждем следующий event loop tick, когда кнопка будет доступна
        await wait(10);
        editButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [editableForm, reset]);

  const handleSubmitForm = useCallback(
    async (formData: FieldValuesList<FieldValuesWithAvatar>) => {
      try {
        await onSubmit(formData);

        toggleEditableForm();

        // Ждем следующий event loop tick, когда кнопка будет доступна
        await wait(10);
        editButtonRef.current?.focus();
      } catch (error) {
        if (typeof error === "string") {
          setError("root", { message: error });
        } else if (error instanceof Error) {
          setError("root", { message: error.message });
        }
      }
    },
    [onSubmit, setError],
  );

  const handleEditFormClick: React.MouseEventHandler = useCallback((event) => {
    event.preventDefault();

    toggleEditableForm();
  }, []);

  const handleCancelClick: React.MouseEventHandler = useCallback(
    async (event) => {
      event.preventDefault();

      reset();
      toggleEditableForm();

      await wait(10);
      editButtonRef.current?.focus();
    },
    [reset],
  );

  const formError = errors?.root?.message;

  const isStatusMessageVisible = formError || isSubmitting || isSubmitSuccessful;

  const statusMessage = useCallback(() => {
    if (formError) return formError;
    if (isSubmitting) return t("Обновление данных");
    if (isSubmitSuccessful) return t("Данные обновлены");
  }, [formError, isSubmitSuccessful, isSubmitting, t]);

  if (!formFields.all) {
    return null;
  }

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
        render={({ field }) => {
          let error = errors[field.name]?.message;

          if (typeof error !== "string") {
            error = undefined;
          }

          return (
            <Input
              {...field}
              type={item.type}
              label={item.label}
              id={field.name}
              error={error}
              disabled={!editableForm}
            />
          );
        }}
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
      aria-label="Редактирование информации о пользователе"
    >
      <FocusLock returnFocus={true} disabled={!editableForm}>
        <div className={css.header}>
          <div className={cn(css.header__item, css.header__left)}>
            {editableForm && (
              <Button
                type="button"
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
              <Button type="button" className={cn(css.root__button)} onClick={handleEditFormClick} ref={editButtonRef}>
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
          className={cn(css.root__info, { [css.active]: isStatusMessageVisible, [css.error]: formError })}
          aria-live="assertive"
        >
          {statusMessage()}
        </div>
      </FocusLock>
    </form>
  );
};

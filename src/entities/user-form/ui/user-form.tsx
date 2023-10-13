import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import React, { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "app/app-store";

import { User } from "entities/user";
import { userFormSchema } from "entities/user/@x/types";

import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import { Select, SelectOption } from "shared/ui/select";

import { selectFormFields } from "../model/selectors";

import css from "./user-form.module.scss";

type UserFormProps = {
  className?: string;
};

export const UserForm: React.FC<UserFormProps> = ({ className }) => {
  const { t } = useTranslation();
  const formFields = useAppSelector(selectFormFields);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<User>({
    resolver: zodResolver(userFormSchema),
  });

  const handleSubmitForm: SubmitHandler<User> = useCallback(async (formData) => {
    console.log("FormData: ", formData);
  }, []);

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
            <Select {...field} label={item.label} id={field.name}>
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
          <Input {...field} type={item.type} label={item.label} id={field.name} error={errors[field.name]?.message} />
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
      <div className={css.columns}>
        <div className={css.columns__item}>{leftColumnFields}</div>
        <div className={css.columns__item}>{rightColumnFields}</div>
      </div>
      <div
        className={cn(css.root__info, { [css.active]: isSubmitting || formError, [css.error]: formError })}
        aria-live="assertive"
      >
        {formError ? formError : isSubmitting ? t("Получение данных") : ""}
      </div>

      <Button className={cn(css.root__button)} disabled={!isDirty || isSubmitting}>
        {t("Сохранить")}
      </Button>
    </form>
  );
};

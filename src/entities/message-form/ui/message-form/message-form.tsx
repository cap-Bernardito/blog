import { zodResolver } from "@hookform/resolvers/zod";
import cn from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";
import { Textarea } from "shared/ui/textarea";

import ArrowIcon from "shared/assets/icons/arrow-btn.svg";

import { MessageField } from "../../types/types";

import css from "./message-form.module.scss";

type MessageFormProps = {
  className?: string;
  onSubmit: (formData: MessageField) => Promise<boolean>;
};

export const MessageForm: React.FC<MessageFormProps> = ({ className, onSubmit }) => {
  const [statusForm, setStatusForm] = useState<{ message: string; isError?: boolean } | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const messageSchema = z.object({
    message: z.string().min(3, "От 3 знаков"),
  });
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmitForm = useCallback(
    async (formData: MessageField) => {
      try {
        const isSuccess = await onSubmit(formData);

        if (isSuccess) {
          reset();
        } else {
          throw new Error("Что-то пошло не так");
        }
      } catch (error) {
        if (typeof error === "string") {
          setError("root", { message: error });
        } else if (error instanceof Error) {
          setError("root", { message: error.message });
        }
      }
    },
    [onSubmit, reset, setError],
  );

  const handleFocus = useCallback(() => setIsFocus(true), []);
  const handleBlur = useCallback(() => setIsFocus(false), []);

  useEffect(() => {
    const timer = setTimeout(() => setStatusForm(null), 3000);
    const hasError = Object.keys(errors).length;

    if (hasError) {
      const formError = errors?.root?.message;

      formError && setStatusForm({ message: formError, isError: true });
    } else {
      isSubmitting && setStatusForm({ message: "Отправка данных" });
      isSubmitSuccessful && setStatusForm({ message: "Данные добавлены" });
    }

    return () => {
      clearInterval(timer);
      setStatusForm(null);
    };
  }, [errors, isSubmitSuccessful, isSubmitting]);

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      if (!isFocus) return;

      if (event.key === "Enter") {
        event.preventDefault();

        handleSubmit(handleSubmitForm)();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleSubmit, handleSubmitForm, isFocus]);

  return (
    <form
      className={cn(css.root, className)}
      action=""
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleSubmitForm)}
      aria-label="Добавить комментарий"
    >
      <div className={cn(css.root__main)}>
        <Controller
          name="message"
          control={control}
          render={({ field }) => {
            let error = errors[field.name]?.message;

            if (typeof error !== "string") {
              error = undefined;
            }

            return (
              <Textarea
                {...field}
                className={css.field}
                placeholder="Введите комментарий"
                label="Введите комментарий"
                id={field.name}
                error={error}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            );
          }}
        />
        <Button
          className={cn(css.button)}
          aria-label="Отправить"
          variant={ButtonVariant.ICON}
          color={ButtonColor.SECONDARY}
        >
          {<ArrowIcon />}
        </Button>
      </div>

      <div
        className={cn(css.root__info, { [css.active]: statusForm, [css.error]: statusForm?.isError })}
        aria-live="assertive"
      >
        {statusForm?.message}
      </div>
    </form>
  );
};

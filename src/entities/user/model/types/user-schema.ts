import { z } from "zod";

import { Country, Currency } from "shared/const/common";

const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    return { message: "" };
  }

  return { message: ctx.defaultError };
};

export const userSchema = z.object({
  id: z.number(),
  first: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
  lastname: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
  city: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
  avatar: z.string().url({ message: "Неверный URL адрес" }),
  username: z
    .string()
    .min(3, { message: "От 3 знаков" })
    .max(20, "До 20 знаков")
    .transform((v) => v.replace(/\s+/g, "_")),
  age: z.string().regex(new RegExp("^\\d{1,2}$"), { message: "Должно быть числом < 100" }),
  currency: z.nativeEnum(Currency, { errorMap: zodErrorMap }),
  country: z.nativeEnum(Country, { errorMap: zodErrorMap }),
});

export const userFormSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;

export type UserForm = z.infer<typeof userFormSchema>;

export const isUser = (user: unknown): user is User => {
  const { success } = userSchema.safeParse(user);

  return success;
};

export const isUserForm = (user: unknown): user is User => {
  const { success } = userFormSchema.safeParse(user);

  return success;
};

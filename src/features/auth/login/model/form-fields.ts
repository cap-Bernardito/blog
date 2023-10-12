import { LoginFormSchema } from "./types/login-schema";

export const fields: FormField<LoginFormSchema>[] = [
  {
    name: "username",
    label: "Логин",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    required: true,
  },
];

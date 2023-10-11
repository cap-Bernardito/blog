import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Имя пользователя слишком короткое" })
    .max(20, "Имя слишком длинное")
    .transform((v) => v.replace(/\s+/g, "_")),
  password: z.string().min(2, "Пароль слишком короткий"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

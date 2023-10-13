import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "От 3 знаков")
    .max(20, "До 20 знаков")
    .transform((v) => v.replace(/\s+/g, "_")),
  password: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

import { z } from "zod";

import { userFormSchema } from "entities/user/@x/types";

export type User = z.infer<typeof userFormSchema>;

export type UserStateSchema = {
  data?: User;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
};

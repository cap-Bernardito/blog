import { User } from "./user-schema";

export type UserStateSchema = {
  data?: User;
  isLoading: boolean;
  error?: string;
};

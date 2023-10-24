import { User } from "entities/user/@x";

export type AllUsersStateSchema = {
  data: User[];
  isLoading: boolean;
  error?: string;
};

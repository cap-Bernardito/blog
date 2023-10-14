import { userSchema } from "../model/types/user-schema";

export const checkUser = (user: unknown): void => {
  userSchema.parse(user);
};

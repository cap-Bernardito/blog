import { User } from "entities/user";

export type UserWithoutId = Omit<User, "id">;

type FieldsList<T> = {
  [K in keyof T]: Omit<FormField<UserWithoutId>, "name">;
};

export type FieldsListUser = FieldsList<UserWithoutId>;

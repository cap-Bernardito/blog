import { User } from "entities/user";

type FieldsList<T> = {
  [K in keyof T]: Omit<FormField<User>, "name">;
};

export type FieldsListUser = FieldsList<User>;

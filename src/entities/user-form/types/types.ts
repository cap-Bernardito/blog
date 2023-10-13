import { User } from "entities/user";

type FieldsList<T> = {
  [K in keyof T]: Omit<FormField<User>, "name">;
};

type FieldValuesList<T> = {
  [K in keyof T]: T[K];
};

export type FieldsListUser = FieldsList<User>;

export type FormFieldWithValue = FormField<User> & { value: unknown };

export type FieldValues = FieldValuesList<User>;

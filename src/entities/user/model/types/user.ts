import { Country, Currency } from "shared/const/common";

export type User = {
  first: string;
  lastname: string;
  age: number;
  currency: Currency;
  country: Country;
  city: string;
  username: string;
  avatar: string;
};

export type UserSchema = {
  data?: User;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
};

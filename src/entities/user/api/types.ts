import { Country, Currency } from "shared/const/common";

import { User } from "../model/types/user-schema";

export type UserDTO = {
  id: number;
  first: string;
  lastname: string;
  city: string;
  avatar: string;
  username: string;
  age: number;
  currency: Currency;
  country: Country;
};

export type RequestUpdateUserBody = User;

import type { SessionDTO } from "entities/session";
import type { UserDTO } from "entities/user";

import { Country, Currency } from "../../../const/common";

export const testSession: SessionDTO = {
  accessToken: "atata",
  user: {
    id: 1,
    username: "admin",
    role: "ADMIN",
  },
};

export const testUser: UserDTO = {
  id: 1,
  first: "Вася",
  lastname: "Василек",
  city: "Moscow",
  avatar: "https://avatars.githubusercontent.com/u/16114823?v=4",
  username: "admin",
  age: 33,
  currency: Currency.RUB,
  country: Country.Russia,
};

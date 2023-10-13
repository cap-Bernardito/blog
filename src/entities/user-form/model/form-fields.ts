import { Country, Currency } from "shared/const/common";

import { FieldsListUser } from "../types/types";

export const formFields: FieldsListUser = {
  first: {
    label: "Имя",
    type: "text",
  },
  lastname: {
    label: "Фамилия",
    type: "text",
  },
  age: {
    label: "Возраст",
    type: "text",
  },
  city: {
    label: "Город",
    type: "text",
  },
  username: {
    label: "Имя пользователя",
    type: "text",
  },
  avatar: {
    label: "Ссылка на аватар",
    type: "text",
  },
  currency: {
    label: "Валюта",
    type: "select",
    options: Object.values(Currency),
  },
  country: {
    label: "Страна",
    type: "select",
    options: Object.values(Country),
  },
};

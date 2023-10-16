import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FieldValuesWithAvatar, FormFields } from "../types/types";

export const formFieldsEmpty = {
  all: null,
  defaults: null,
};

export const formFields: FormFields<FieldValuesWithAvatar> = {
  all: [
    {
      name: "first",
      label: "Имя",
      type: "text",
      value: "Вася",
    },
    {
      name: "lastname",
      label: "Фамилия",
      type: "text",
      value: "Василек",
    },
    {
      name: "avatar",
      label: "Аватар",
      type: "text",
      value: "http://avatar.png",
    },
  ],
  defaults: {
    first: "Вася",
    lastname: "Василек",
    avatar: "http://avatar.png",
  },
};

const FieldsSchema = z.object({
  first: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
  lastname: z.string().min(3, "От 3 знаков").max(20, "До 20 знаков"),
  avatar: z.string().url({ message: "Неверный URL адрес" }),
});

export const fieldsZodResolver = zodResolver(FieldsSchema);

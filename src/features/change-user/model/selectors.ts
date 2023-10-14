import { createSelector } from "reselect";

import { userSelectors } from "entities/user";

import { formFields } from "./form-fields";
import { FieldsListUser, UserWithoutId } from "./types";

export const selectFormFields = createSelector(userSelectors.selectUserData, (user) => {
  if (typeof user === "undefined") {
    return { all: null, defaults: null };
  }

  const fullData = [];
  const valuesOnly = [];

  for (const [fieldName, fieldMeta] of Object.entries(formFields) as Entries<FieldsListUser>) {
    fullData.push({
      ...fieldMeta,
      name: fieldName,
      value: user[fieldName],
    });

    valuesOnly.push([fieldName, user[fieldName]]);
  }

  const defaultValues: UserWithoutId = Object.fromEntries(valuesOnly);

  return { all: fullData, defaults: defaultValues };
});

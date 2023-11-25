import { createSelector } from "reselect";

import { userSelectors } from "entities/user";

import { formFields } from "./form-fields";
import { FieldsListUser, UserWithoutId } from "./types";

export const selectFormFields = createSelector(userSelectors.selectMe, (user) => {
  const me = user?.data;

  if (!me) {
    return { all: null, defaults: null };
  }

  const fullData = [];
  const valuesOnly = [];

  for (const [fieldName, fieldMeta] of Object.entries(formFields) as Entries<FieldsListUser>) {
    fullData.push({
      ...fieldMeta,
      name: fieldName,
      value: me[fieldName],
    });

    valuesOnly.push([fieldName, me[fieldName]]);
  }

  const defaultValues: UserWithoutId = Object.fromEntries(valuesOnly);

  return { all: fullData, defaults: defaultValues };
});

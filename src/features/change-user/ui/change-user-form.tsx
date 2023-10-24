import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { sessionSelectors } from "entities/session";
import { updateUserData } from "entities/user";
import { isUserForm, userFormSchema } from "entities/user/model/types/user-schema";
import { UserForm } from "entities/user-form";

import { selectFormFields } from "../model/selectors";

export const ChangeUserForm = () => {
  const userId = useAppSelector(sessionSelectors.selectUserId);
  const formFields = useAppSelector(selectFormFields);
  const dispatch = useAppDispatch();

  const handleSummit = useCallback(
    async (formData: unknown) => {
      if (!userId || !isUserForm(formData)) {
        throw new Error("Невалидные данные");
      }

      await dispatch(updateUserData({ formData, userId })).unwrap();

      return true;
    },
    [dispatch, userId],
  );

  return <UserForm onSubmit={handleSummit} formFields={formFields} zodResolver={zodResolver(userFormSchema)} />;
};

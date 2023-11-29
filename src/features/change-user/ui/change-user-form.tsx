import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { sessionSelectors } from "entities/session";
import { userRTKApi } from "entities/user";
import { isUserForm, userFormSchema } from "entities/user";
import { UserForm } from "entities/user-form";

import { getApiErrorMessage } from "shared/api/get-api-error-message";

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

      try {
        await dispatch(userRTKApi.endpoints.updateMe.initiate({ formData, userId })).unwrap();
      } catch (error) {
        throw new Error(getApiErrorMessage(error));
      }

      return true;
    },
    [dispatch, userId],
  );

  return <UserForm onSubmit={handleSummit} formFields={formFields} zodResolver={zodResolver(userFormSchema)} />;
};

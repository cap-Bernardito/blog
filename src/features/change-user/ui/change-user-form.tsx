import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { sessionSelectors } from "entities/session";
import { updateUserData } from "entities/user";
import { isUser, userFormSchema } from "entities/user/model/types/user-schema";
import { UserForm } from "entities/user-form";

import { selectFormFields } from "../model/selectors";

export const ChangeUserForm = () => {
  const userId = useAppSelector(sessionSelectors.selectUseId);
  const formFields = useAppSelector(selectFormFields);
  const dispatch = useAppDispatch();

  const handleSummit = useCallback(
    async (formData: unknown) => {
      if (!userId || !isUser(formData)) {
        return false;
      }

      await dispatch(updateUserData({ formData, userId })).unwrap();

      return true;
    },
    [dispatch, userId],
  );

  return <UserForm onSubmit={handleSummit} formFields={formFields} zodResolver={zodResolver(userFormSchema)} />;
};

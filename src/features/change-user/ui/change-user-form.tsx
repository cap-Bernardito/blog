import React, { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { sessionSelectors } from "entities/session";
import { updateUserData, User } from "entities/user";
import { UserForm } from "entities/user-form";

export const ChangeUserForm = () => {
  const userId = useAppSelector(sessionSelectors.selectUseId);
  const dispatch = useAppDispatch();

  const handleSummit = useCallback(
    async (formData: User) => {
      if (!userId) {
        return false;
      }

      await dispatch(updateUserData({ formData, userId })).unwrap();

      return true;
    },
    [dispatch, userId],
  );

  return <UserForm onSubmit={handleSummit} />;
};

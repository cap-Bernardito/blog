import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "app/app-store";

import { userSelectors } from "entities/user";

import { Loader } from "shared/ui/loader/loader";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector(userSelectors.getAuthData);
  const isAuthInit = useAppSelector(userSelectors.getAuthIsInit);

  if (!isAuthInit) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "app/app-store";

import { sessionSelectors } from "entities/session";

import { Loader } from "shared/ui/loader/loader";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector(sessionSelectors.isAuth);
  const isAuthInit = useAppSelector(sessionSelectors.isAuthInit);

  if (!isAuthInit) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

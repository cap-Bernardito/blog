import React from "react";
import { Navigate } from "react-router-dom";

import { withAuth } from "entities/session";

import { Loader } from "shared/ui/loader/loader";

const WithAuthRoute = withAuth({
  Authorized: ({ children }) => children,
  UnAuthorized: () => <Navigate to="/" />,
  fallback: <Loader />,
});

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => (
  <WithAuthRoute>{children}</WithAuthRoute>
);

import React from "react";
import { Navigate } from "react-router-dom";

import { Session, withAuth } from "entities/session";

import { Loader } from "shared/ui/loader/loader";

import { routePaths } from "./app-router-config";

const WithAuthRoute = withAuth({
  Authorized: ({ children, viewerRole, permissions }) => {
    return !permissions || (permissions as Session["role"][]).includes(viewerRole) ? (
      children
    ) : (
      <Navigate to={routePaths.forbidden} />
    );
  },
  UnAuthorized: () => <Navigate to="/" />,
  fallback: <Loader />,
});

export const ProtectedRoute: React.FC<React.PropsWithChildren<{ permissions?: Session["role"][] }>> = ({
  children,
  permissions,
}) => <WithAuthRoute permissions={permissions}>{children}</WithAuthRoute>;

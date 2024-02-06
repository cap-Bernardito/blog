import React from "react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useAppSelector } from "app/app-store/store-hooks";

import { User, userSelectors } from "entities/user/@x";

import { Session } from "./types/session-schema";
import { isAuth as isAuthSelect, isAuthInit as isAuthInitSelect, selectUserRole } from "./selectors";

type WithAuthProps<P> = {
  Authorized: React.ComponentType<P & { viewer: User; viewerRole: Session["role"] }>;
  UnAuthorized: React.ComponentType<P>;
  fallback?: React.ReactNode;
};

export const withAuth = <P extends React.PropsWithChildren<Record<string, unknown>>>({
  Authorized,
  UnAuthorized,
  fallback = false,
}: WithAuthProps<P>) => {
  return function WithAuthComponent(props: P) {
    const isAuth = useAppSelector(isAuthSelect);
    const viewerRole = useAppSelector(selectUserRole);
    const isAuthInit = useAppSelector(isAuthInitSelect);
    const { data: currentUser, isSuccess, isLoading } = useAppSelector(userSelectors.selectMe);

    if (fallback && (!isAuthInit || isLoading)) {
      return fallback;
    }

    return isAuth && isSuccess && viewerRole ? (
      <Authorized viewer={currentUser} viewerRole={viewerRole} {...props} />
    ) : (
      <UnAuthorized {...props} />
    );
  };
};

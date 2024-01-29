import React from "react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useAppSelector } from "app/app-store/store-hooks";

import { User, userSelectors } from "entities/user/@x";

import { isAuth as isAuthSelect, isAuthInit as isAuthInitSelect } from "./selectors";

type WithAuthProps<P> = {
  Authorized: React.ComponentType<P & { viewer: User }>;
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
    const isAuthInit = useAppSelector(isAuthInitSelect);
    const { data: currentUser, isSuccess, isLoading } = useAppSelector(userSelectors.selectMe);

    if (fallback && (!isAuthInit || isLoading)) {
      return fallback;
    }

    return isAuth && isSuccess ? <Authorized viewer={currentUser} {...props} /> : <UnAuthorized {...props} />;
  };
};

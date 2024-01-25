import React from "react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useAppSelector } from "app/app-store/store-hooks";

import { User, userSelectors } from "entities/user/@x";

import { isAuth as isAuthSelect, isAuthInit as isAuthInitSelect } from "./selectors";

type WithAuthProps<P> = {
  Authorized: React.ComponentType<P & { viewer: User }>;
  UnAuthorized: React.ComponentType<P>;
};

export const withAuth = <P extends React.PropsWithChildren<Record<string, React.ReactNode>>>({
  Authorized,
  UnAuthorized,
}: WithAuthProps<P>) => {
  return function WithAuthComponent(props: P) {
    const isAuth = useAppSelector(isAuthSelect);
    const isAuthInit = useAppSelector(isAuthInitSelect);
    const { data: currentUser, isSuccess, isLoading } = useAppSelector(userSelectors.selectMe);

    if (!isAuthInit || isLoading) {
      return <div>Авторизация...</div>;
    }

    return isAuth && isSuccess ? <Authorized viewer={currentUser} {...props} /> : <UnAuthorized {...props} />;
  };
};

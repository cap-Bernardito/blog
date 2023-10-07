import { ComponentType, lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

import type { LoginProfileButtonProps } from "./login-profile-button";

export const LoginProfileButtonAsync = lazy(() =>
  delayImportForDemo<
    { LoginProfileButton: ComponentType<LoginProfileButtonProps> },
    "LoginProfileButton",
    LoginProfileButtonProps
  >(import(/* webpackChunkName: "login_form" */ "./login-profile-button"), "LoginProfileButton"),
);

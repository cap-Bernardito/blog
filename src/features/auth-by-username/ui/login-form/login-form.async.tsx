import { ComponentType, lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

import { LoginFormProps } from "./login-form";

export const LoginFormAsync = lazy(() =>
  delayImportForDemo<{ LoginForm: ComponentType<LoginFormProps> }, "LoginForm", LoginFormProps>(
    import(/* webpackChunkName: "login_form" */ "./login-form"),
    "LoginForm",
  ),
);

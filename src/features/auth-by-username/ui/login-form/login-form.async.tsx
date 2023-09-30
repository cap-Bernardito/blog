import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delayImportForDemo";

export const LoginFormAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "login_form"*/ "./login-form"), "LoginForm"),
);

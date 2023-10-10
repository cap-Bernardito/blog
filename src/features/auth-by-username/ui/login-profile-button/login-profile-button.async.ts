import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const LogoutProfileButtonAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "login_form" */ "./login-profile-button"), "LogoutProfileButton"),
);

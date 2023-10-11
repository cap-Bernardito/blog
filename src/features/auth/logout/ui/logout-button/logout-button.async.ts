import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const LogoutButtonAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "login_form" */ "./logout-button"), "LogoutButton"),
);

import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const UserPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "user_page"*/ "./user-page"), "UserPage"),
);

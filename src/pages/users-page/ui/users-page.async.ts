import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const UsersPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "users_page"*/ "./users-page"), "UsersPage"),
);

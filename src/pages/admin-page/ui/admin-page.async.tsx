import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const AdminPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "admin_page"*/ "./admin-page"), "AdminPage"),
);

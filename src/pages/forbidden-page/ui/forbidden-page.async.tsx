import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const ForbiddenPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "forbidden-page"*/ "./forbidden-page"), "ForbiddenPage"),
);

import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delayImportForDemo";

export const NotFoundPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "not-found-page"*/ "./not-found-page"), "NotFoundPage"),
);

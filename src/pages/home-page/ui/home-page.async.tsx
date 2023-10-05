import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const HomePageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "home_page"*/ "./home-page"), "HomePage"),
);

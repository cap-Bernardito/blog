import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const AboutPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "about_page"*/ "./about-page"), "AboutPage"),
);

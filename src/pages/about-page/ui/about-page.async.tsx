import { lazy } from "react";
import { delayImportForDemo } from "shared/lib/delayImportForDemo";

export const AboutPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "about_page"*/ "./about-page"), "AboutPage")
);

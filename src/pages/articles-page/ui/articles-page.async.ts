import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const ArticlesPageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "articles_page"*/ "./articles-page"), "ArticlesPage"),
);

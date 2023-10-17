import { lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

export const ArticlePageAsync = lazy(() =>
  delayImportForDemo(import(/* webpackChunkName: "article_page"*/ "./article-page"), "ArticlePage"),
);

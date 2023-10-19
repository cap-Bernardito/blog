import { ComponentType, lazy } from "react";

import { delayImportForDemo } from "shared/lib/delay-import-for-demo";

import { ArticleProps } from "./article";

export const ArticleAsync = lazy(() =>
  delayImportForDemo<{ Article: ComponentType<ArticleProps> }, "Article", ArticleProps>(
    import(/* webpackChunkName: "article" */ "./article"),
    "Article",
  ),
);

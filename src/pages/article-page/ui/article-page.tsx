import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Article, TArticle } from "entities/article";

export const ArticlePage = () => {
  const { id } = useParams<TArticle["id"]>();

  return (
    <Suspense fallback={""}>
      <Article id={id} />
    </Suspense>
  );
};

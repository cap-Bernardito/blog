import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { Article, TArticle } from "entities/article";

import { Loader } from "shared/ui/loader/loader";

export const ArticlePage = () => {
  const { id } = useParams<TArticle["id"]>();

  return (
    <Suspense fallback={<Loader />}>
      <Article id={id} />
    </Suspense>
  );
};

import cn from "classnames";
import { useEffect } from "react";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCardHorizontal, ArticleCardVertical } from "entities/article";
import {
  articlesAdapterSelectors,
  articlesReducer,
  articlesSelectors,
  fetchArticlesList,
} from "entities/articles-list";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";
import { Loader } from "shared/ui/loader/loader";

import css from "./articles-page.module.scss";

const asyncArticlesReducer: AsyncReducersList = { articles: articlesReducer };

export const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const articlesIsLoading = useAppSelector(articlesSelectors.selectIsLoading);
  const articlesError = useAppSelector(articlesSelectors.selectError);
  const articlesView = useAppSelector(articlesSelectors.selectView);
  const articles = useAppSelector(articlesAdapterSelectors.selectAll);

  useAsyncReducerLoader(asyncArticlesReducer);

  useEffect(() => {
    dispatch(fetchArticlesList());
  }, [dispatch]);

  if (articlesError) {
    return <div>{articlesError}</div>;
  }

  const ArticleCardComponent = articlesView === "list" ? ArticleCardHorizontal : ArticleCardVertical;

  return (
    <div className={cn(css.root, { [css.grid]: articlesView === "grid", [css.list]: articlesView === "list" })}>
      {articlesIsLoading && <Loader />}
      {articles && articles.map((article) => <ArticleCardComponent key={article.id} {...article} />)}
    </div>
  );
};

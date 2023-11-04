import cn from "classnames";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCardHorizontal, ArticleCardVertical } from "entities/article";
import {
  articlesActions,
  articlesAdapterSelectors,
  articlesReducer,
  articlesSelectors,
  fetchArticlesList,
  fetchArticlesListPortion,
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
  const { ref } = useInView({
    initialInView: false,
    triggerOnce: true,
    threshold: 0,
    rootMargin: "-100px 0px 0px 0px",
    onChange(inView) {
      if (inView) {
        console.log("HERE: inView", inView);
        dispatch(fetchArticlesListPortion());
      }
    },
  });

  useAsyncReducerLoader(asyncArticlesReducer);

  useEffect(() => {
    if (articles.length === 0) {
      dispatch(articlesActions.initState());
      dispatch(fetchArticlesList({ page: 1 }));
    }
  }, [articles.length, articlesView, dispatch]);

  if (articlesError) {
    return <div>{articlesError}</div>;
  }

  const ArticleCardComponent = articlesView === "list" ? ArticleCardHorizontal : ArticleCardVertical;

  const articlesList = articles.map((article, index) => {
    if (index === articles.length - 1) {
      return <ArticleCardComponent key={article.id} {...article} ref={ref} />;
    }

    return <ArticleCardComponent key={article.id} {...article} />;
  });

  return (
    <div className={cn(css.root, { [css.grid]: articlesView === "grid", [css.list]: articlesView === "list" })}>
      {articles && articlesList}
      {articlesIsLoading && <Loader />}
    </div>
  );
};

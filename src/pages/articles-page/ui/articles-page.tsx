import cn from "classnames";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Virtuoso } from "react-virtuoso";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import {
  ArticleCardHorizontal,
  ArticleCardHorizontalSkeleton,
  ArticleCardVertical,
  ArticleCardVerticalSkeleton,
} from "entities/article";
import {
  articlesAdapterSelectors,
  articlesReducer,
  articlesSelectors,
  fetchArticlesListInitial,
  fetchArticlesListPortion,
} from "entities/articles-list";
import { useScrollPosition } from "entities/scroll-position";

import { useAsyncReducerLoader } from "shared/lib/use-async-reducer-loader";

import css from "./articles-page.module.scss";
const asyncArticlesReducer: AsyncReducersList = { articles: articlesReducer };

export const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const articlesIsLoading = useAppSelector(articlesSelectors.selectIsLoading);
  const articlesError = useAppSelector(articlesSelectors.selectError);
  const articlesView = useAppSelector(articlesSelectors.selectView);
  const articlesCount = useAppSelector(articlesSelectors.selectLimit);
  const articles = useAppSelector(articlesAdapterSelectors.selectAll);
  const initialScrollPosition = useScrollPosition(true);
  const { ref } = useInView({
    initialInView: false,
    triggerOnce: true,
    threshold: 0,
    rootMargin: "-100px 0px 0px 0px",
    onChange(inView) {
      if (inView) {
        dispatch(fetchArticlesListPortion());
      }
    },
  });

  useAsyncReducerLoader(asyncArticlesReducer);

  useEffect(() => {
    dispatch(fetchArticlesListInitial());
  }, [dispatch]);

  if (articlesError) {
    return <div>{articlesError}</div>;
  }

  if (articles.length === 0 && !articlesIsLoading) {
    return (
      <div className={cn(css.root)}>
        <h1>Ничего не нашлось...</h1>
      </div>
    );
  }

  const ArticleCardSkeletonComponent =
    articlesView === "list" ? ArticleCardHorizontalSkeleton : ArticleCardVerticalSkeleton;
  const articlesSkeletonList = Array(articlesCount)
    .fill(0)
    .map((article, index) => {
      if (index === articles.length - 1) {
        return <ArticleCardSkeletonComponent key={index} ref={ref} />;
      }

      return <ArticleCardSkeletonComponent key={index} {...article} />;
    });

  const ArticleCardComponent = articlesView === "list" ? ArticleCardHorizontal : ArticleCardVertical;

  const Footer = React.memo(function Footer() {
    return articlesIsLoading && <>{articlesSkeletonList}</>;
  });

  const articlesVirtuoso = (
    <Virtuoso
      useWindowScroll
      style={{ height: "100%" }}
      data={articles}
      initialScrollTop={initialScrollPosition}
      itemContent={(index, article) => {
        if (index === articles.length - 1) {
          return <ArticleCardComponent key={article.id} {...article} ref={ref} />;
        }

        return <ArticleCardComponent key={article.id} {...article} />;
      }}
      components={{
        Footer,
        ScrollSeekPlaceholder: () => <ArticleCardSkeletonComponent />,
      }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 500,
        exit: (velocity) => Math.abs(velocity) < 30,
      }}
    />
  );

  return (
    <div className={cn(css.root, { [css.grid]: articlesView === "grid", [css.list]: articlesView === "list" })}>
      {articles.length > 0 && articlesVirtuoso}
      {/* {articlesIsLoading && articlesSkeletonList} */}
    </div>
  );
};

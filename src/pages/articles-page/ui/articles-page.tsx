import cn from "classnames";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ItemContent, Virtuoso, VirtuosoGrid, VirtuosoHandle } from "react-virtuoso";

import { AsyncReducersList, useAppDispatch, useAppSelector } from "app/app-store";

import {
  Article,
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
  const refVirtuoso = useRef<VirtuosoHandle>(null);

  useAsyncReducerLoader(asyncArticlesReducer);

  useEffect(() => {
    dispatch(fetchArticlesListInitial());
  }, [dispatch]);

  useEffect(() => {
    if (articlesView === "grid") {
      setTimeout(() => window.scrollTo(0, initialScrollPosition), 100);
    }
  }, [articlesView, initialScrollPosition]);

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

  let ArticleCard: typeof ArticleCardHorizontal | typeof ArticleCardVertical;
  let ArticleCardSkeleton: typeof ArticleCardHorizontalSkeleton | typeof ArticleCardHorizontalSkeleton;
  let skeletonWrapperClassName: string;

  if (articlesView === "list") {
    skeletonWrapperClassName = css.list;
    ArticleCard = ArticleCardHorizontal;
    ArticleCardSkeleton = ArticleCardHorizontalSkeleton;
  } else {
    skeletonWrapperClassName = css.grid;
    ArticleCard = ArticleCardVertical;
    ArticleCardSkeleton = ArticleCardVerticalSkeleton;
  }

  const articlesSkeletonList = (
    <div className={cn(skeletonWrapperClassName, css.skeleton)}>
      {Array(articlesCount)
        .fill(0)
        .map((article, index) => (
          <ArticleCardSkeleton className={css.card} key={index} {...article} />
        ))}
    </div>
  );

  if (articles.length === 0 && articlesIsLoading) {
    return articlesSkeletonList;
  }

  const itemContent: ItemContent<Article, unknown> = (index, article) => {
    const isLastItem = index === articles.length - 1;

    return <ArticleCard className={css.card} key={article.id} {...article} ref={isLastItem ? ref : undefined} />;
  };

  const articlesVirtuoso =
    articlesView === "list" ? (
      <Virtuoso
        ref={refVirtuoso}
        useWindowScroll
        data={articles}
        initialScrollTop={initialScrollPosition}
        itemContent={itemContent}
      />
    ) : (
      <VirtuosoGrid
        ref={refVirtuoso}
        useWindowScroll
        data={articles}
        listClassName={cn(css.grid)}
        itemContent={itemContent}
      />
    );

  return (
    <div className={cn(css.root)}>
      {articles.length > 0 && articlesVirtuoso}
      {articlesIsLoading && articlesSkeletonList}
    </div>
  );
};

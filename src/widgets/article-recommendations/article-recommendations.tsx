import cn from "classnames";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { ArticleCardVertical, articleSelectors, fetchArticlesRecommendations } from "entities/article";

import css from "./article-recommendations.module.scss";

type ArticleRecommendationsProps = {
  className?: string;
  type?: string;
};

export const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({ className, type }) => {
  const recommendations = useAppSelector(articleSelectors.selectRecommendations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticlesRecommendations({ limit: 8, type }));
  }, [dispatch, type]);

  return (
    recommendations && (
      <div className={cn(css.root, className)}>
        <h2 className={css.title}>Рекомендуем:</h2>
        {recommendations.map((article) => {
          return <ArticleCardVertical key={article.id} {...article} />;
        })}
      </div>
    )
  );
};

import cn from "classnames";
import React from "react";

import { Skeleton } from "shared/ui/skeleton";

import EyeIcon from "shared/assets/icons/eye.svg";

import { Article } from "../../model/types/article";

import css from "./article-header.module.scss";

type ArticleHeaderDataProps = Pick<Article, "title" | "createdAt" | "views" | "img">;

type ArticleHeaderProps = Partial<ArticleHeaderDataProps> & {
  className?: string;
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = (props) => {
  const { className, title, createdAt, views, img } = props;

  return (
    <header className={cn(css.root, className)}>
      <h1 className={css.root__title}>
        {title || <Skeleton count={1} height={32} style={{ marginBottom: "16px" }} />}
      </h1>
      <time className={css.root__date}>
        <span className="sr-only">Дата публикации</span>
        {createdAt || <Skeleton count={1} height={20} style={{ marginBottom: "20px" }} />}
      </time>
      <div className={css.root__views}>
        <span className="sr-only">Количество просмотров</span>
        <EyeIcon width={24} height={24} viewBox="0 0 32 32" />
        {views || <Skeleton count={1} height={20} style={{ marginBottom: "20px" }} />}
      </div>
      <div className={css.root__hero}>
        {img ? (
          <img src={img} className="img_adaptive" alt="" />
        ) : (
          <Skeleton count={1} height={180} style={{ marginBottom: "32px" }} />
        )}
      </div>
    </header>
  );
};

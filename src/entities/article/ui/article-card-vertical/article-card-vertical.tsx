import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { routePaths } from "app/app-router/app-router-config";

import { Avatar } from "shared/ui/avatar";
import { Skeleton } from "shared/ui/skeleton";

import EyeIcon from "shared/assets/icons/eye.svg";

import { Article } from "../../model/types/article";

import css from "./article-card-vertical.module.scss";

type ArticleCardVerticalProps = {
  className?: string;
  id: Article["id"];
  img: Article["img"];
  title: Article["title"];
  createdAt: Article["createdAt"];
  views: Article["views"];
  author: Pick<Article["author"], "avatar" | "username">;
};

const ArticleCardVerticalNoMemo = React.forwardRef<HTMLDivElement, ArticleCardVerticalProps>((props, ref) => {
  const { className, img, title, createdAt, views, author, id } = props;
  const articlePath = `${routePaths.articles}/${id}`;

  return (
    <div className={cn(css.root, className)} ref={ref}>
      <div className={css.hero}>
        <div className={css.hero__inner}>
          <Link to={articlePath} aria-label={title}>
            <img src={img} alt="" />
          </Link>
        </div>
      </div>
      <div className={cn(css.main)}>
        <div className={css.body}>
          <Link to={articlePath}>{title}</Link>
        </div>
        <div className={css.meta}>
          <div className={css.meta__date}>{createdAt}</div>
          <div className={css.meta__view}>
            <span className="sr-only">Количество просмотров</span>
            <EyeIcon width={24} height={24} viewBox="0 0 32 32" />
            {views}
          </div>
        </div>
        <div className={css.author}>
          <Avatar url={author.avatar} size="sm" className={css.author__avatar} />
          <span className={css.author__username}>{author.username}</span>
        </div>
      </div>
    </div>
  );
});

ArticleCardVerticalNoMemo.displayName = "ArticleCardVertical";

export const ArticleCardVertical = React.memo(ArticleCardVerticalNoMemo);

export const ArticleCardVerticalSkeleton = React.forwardRef<HTMLDivElement>(
  ({ className }: { className?: string }, ref) => (
    <div className={cn(css.root, css.skeleton, className)} ref={ref}>
      <div className={css.hero}>
        <div className={css.hero__inner}>
          <Skeleton style={{ paddingBottom: "50%" }} />
        </div>
      </div>
      <div className={cn(css.main)}>
        <div className={css.body}>
          <Skeleton height={12} />
          <Skeleton height={12} />
          <Skeleton height={12} />
        </div>
        <div className={css.meta}>
          <div className={css.meta__date}>
            <Skeleton width={90} />
          </div>
          <div className={css.meta__view}>
            <Skeleton width={90} />
          </div>
        </div>
        <div className={css.author}>
          <Skeleton className={css.author__avatar} height={32} width={32} circle={true} />
          <span className={css.author__username}>
            <Skeleton width={150} />
          </span>
        </div>
      </div>
    </div>
  ),
);

ArticleCardVerticalSkeleton.displayName = "ArticleCardVerticalSkeleton";

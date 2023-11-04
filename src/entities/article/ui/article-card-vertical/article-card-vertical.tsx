import cn from "classnames";
import React from "react";
import { Link } from "react-router-dom";

import { routePaths } from "app/app-router/app-router-config";

import { Avatar } from "shared/ui/avatar";

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

export const ArticleCardVertical = React.forwardRef<HTMLDivElement, ArticleCardVerticalProps>((props, ref) => {
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

ArticleCardVertical.displayName = "ArticleCardVertical";

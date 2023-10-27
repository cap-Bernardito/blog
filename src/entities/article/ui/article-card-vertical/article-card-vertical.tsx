import cn from "classnames";
import React from "react";

import { Avatar } from "shared/ui/avatar";

import EyeIcon from "shared/assets/icons/eye.svg";

import { Article } from "../../model/types/article";

import css from "./article-card-vertical.module.scss";

type ArticleCardVerticalProps = {
  className?: string;
  img: Article["img"];
  title: Article["title"];
  createdAt: Article["createdAt"];
  views: Article["views"];
  author: Pick<Article["author"], "avatar" | "username">;
};

export const ArticleCardVertical: React.FC<ArticleCardVerticalProps> = (props) => {
  const { className, img, title, createdAt, views, author } = props;

  return (
    <div className={cn(css.root, className)}>
      <div className={css.hero}>
        <div className={css.hero__inner}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className={cn(css.main)}>
        <div className={css.body}>{title}</div>
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
};

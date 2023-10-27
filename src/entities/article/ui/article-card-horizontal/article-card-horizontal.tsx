import cn from "classnames";
import React from "react";

import { Avatar } from "shared/ui/avatar";
import { Button, ButtonColor } from "shared/ui/button";

import EyeIcon from "shared/assets/icons/eye.svg";

import { Article } from "../../model/types/article";

import css from "./article-card-horizontal.module.scss";

type ArticleCardHorizontalProps = {
  className?: string;
  img: Article["img"];
  title: Article["title"];
  excerpt: Article["excerpt"];
  createdAt: Article["createdAt"];
  views: Article["views"];
  author: Pick<Article["author"], "avatar" | "username">;
};

export const ArticleCardHorizontal: React.FC<ArticleCardHorizontalProps> = (props) => {
  const { className, img, title, excerpt, createdAt, views, author } = props;

  return (
    <div className={cn(css.root, className)}>
      <div className={css.meta}>
        <div className={cn(css.meta__author, css.author)}>
          <Avatar url={author.avatar} size="sm" className={css.author__avatar} />
          <span className={css.autor__username}>{author.username}</span>
        </div>
        <div className={css.meta__date}>{createdAt}</div>
      </div>
      <div className={css.title}>{title}</div>
      <div className={css.hero}>
        <div className={css.hero__inner}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className={cn(css.main)}>{excerpt}</div>
      <div className={css.footer}>
        <div className={css.footer__more}>
          <Button color={ButtonColor.SECONDARY}>Читать далее</Button>
        </div>
        <div className={css.footer__view}>
          <span className="sr-only">Количество просмотров</span>
          <EyeIcon width={24} height={24} viewBox="0 0 32 32" />
          {views}
        </div>
      </div>
    </div>
  );
};

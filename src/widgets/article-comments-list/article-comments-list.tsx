import cn from "classnames";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { Article } from "entities/article";
import {
  articleCommentsAdapterSelectors,
  articleCommentsSelectors,
  fetchArticleComments,
} from "entities/article-comments";
import { Comment } from "entities/comment";

import css from "./article-comments-list.module.scss";

type ArticleCommentsListtProps = {
  className?: string;
  id?: Article["id"];
};

export const ArticleCommentsList: React.FC<ArticleCommentsListtProps> = ({ className, id }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(articleCommentsAdapterSelectors.selectAll);
  const commentsError = useAppSelector(articleCommentsSelectors.selectError);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleComments(id));
    }
  }, [dispatch, id]);

  if (commentsError) {
    return <div>{commentsError}</div>;
  }

  return (
    <section className={cn(css.root, className)}>
      <h2 className={cn(css.title)}>Комментарии</h2>
      {comments.map((comment) => (
        <Comment className={css.comment} key={comment.id} img={comment.author.avatar} title={comment.author.name}>
          {comment.text}
        </Comment>
      ))}
    </section>
  );
};

import cn from "classnames";
import React from "react";

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { routePaths } from "app/app-router/app-router-config";

import { AddCommentForm } from "features/article/add-comment";

import { Article } from "entities/article";
import { articleCommentsAdapterSelectors, articleCommentsRTKApi } from "entities/article-comments";
import { Comment } from "entities/comment";

import { getEntityState } from "shared/lib/get-entity-state";
import { AppLink } from "shared/ui/app-link";

import css from "./article-comments-list.module.scss";

type ArticleCommentsListtProps = {
  className?: string;
  id?: Article["id"];
};

export const ArticleCommentsList: React.FC<ArticleCommentsListtProps> = ({ className, id }) => {
  const { data, isError, error: commentsError } = articleCommentsRTKApi.useAllArticleCommentsQuery(id);
  const comments = articleCommentsAdapterSelectors.selectAll(getEntityState(data));

  if (isError) {
    return <div>{commentsError.toString()}</div>;
  }

  return (
    <section className={cn(css.root, className)}>
      <h2 className={cn(css.title)}>Комментарии</h2>

      <div className={cn(css.form)}>
        <AddCommentForm />
      </div>

      {comments &&
        comments.map((comment) => {
          const {
            id,
            author: { name, avatar },
          } = comment;

          return (
            <Comment
              className={css.comment}
              key={id}
              img={avatar}
              title={<AppLink to={`${routePaths.users}/${id}`}>{name}</AppLink>}
            >
              {comment.text}
            </Comment>
          );
        })}
    </section>
  );
};

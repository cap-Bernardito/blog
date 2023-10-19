import React from "react";

import { TArticleBody } from "../../model/types/article";

import css from "./article-body.module.scss";

export const ArticleBody: React.FC<TArticleBody> = (block) => {
  if (typeof block.tag === "undefined") {
    return null;
  }

  if (block.tag === "code") {
    return React.createElement(() => <div dangerouslySetInnerHTML={{ __html: block.body }}></div>, {
      key: block.id,
    });
  }

  if (block.tag === "img") {
    return React.createElement(
      block.tag,
      {
        key: block.id,
        ...block.attrs,
        className: css.image,
      },
      null,
    );
  }

  if (typeof block.body === "string") {
    return React.createElement(block.tag, { key: block.id }, block.body);
  }

  return React.createElement(
    block.tag,
    {
      key: block.id,
    },

    block.body.map((subComp) => ArticleBody(subComp)),
  );
};

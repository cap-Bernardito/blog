import React from "react";

import { Code } from "shared/ui/code";

import { TArticleBody } from "../../model/types/article";

import css from "./article-body.module.scss";

export const ArticleBody: React.FC<TArticleBody> = (block) => {
  if (typeof block.tag === "undefined") {
    return null;
  }

  if (typeof block.body !== "string") {
    return React.createElement(
      block.tag,
      {
        key: block.id,
      },

      block.body.map((subComp) => ArticleBody(subComp)),
    );
  }

  if (block.tag === "code") {
    return (
      <Code key={block.id} language={block.attrs?.lang}>
        {block.body}
      </Code>
    );
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

  return React.createElement(block.tag, { key: block.id }, block.body);
};

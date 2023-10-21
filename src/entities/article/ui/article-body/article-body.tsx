import cn from "classnames";
import React from "react";

import { Skeleton } from "shared/ui/skeleton";

import { createElementFromMeta } from "../../lib/create-element-from-meta";
import { Article } from "../../model/types/article";

import css from "./article-body.module.scss";

type ArticleBodyProps = {
  className?: string;
  data?: Article["body"];
};

export const ArticleBody: React.FC<ArticleBodyProps> = ({ className, data }) => {
  return (
    <section className={cn(css.root, className)}>
      {data ? (
        data.map((el) => {
          return createElementFromMeta(el);
        })
      ) : (
        <div>
          <Skeleton count={10} />
          <Skeleton count={1} style={{ marginBottom: "24px" }} />
          <Skeleton count={1} height={30} style={{ marginBottom: "16px" }} />
          <Skeleton count={10} />
          <Skeleton count={1} style={{ marginBottom: "24px" }} />
        </div>
      )}
    </section>
  );
};

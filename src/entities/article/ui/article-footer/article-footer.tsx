import cn from "classnames";
import React from "react";

import { Skeleton } from "shared/ui/skeleton";

import { Article } from "../../model/types/article";

import css from "./article-footer.module.scss";

type ArticleFooterProps = {
  className?: string;
  tags?: Article["type"];
};

export const ArticleFooter: React.FC<ArticleFooterProps> = ({ className, tags }) => {
  return (
    <footer className={cn(css.root, className)}>
      <div className="sr-only">Тэги</div>
      <div className={cn(css.tags)}>
        {tags ? (
          tags.map((t) => (
            <div key={t} className={cn(css.tags__item)}>
              {t}
            </div>
          ))
        ) : (
          <Skeleton count={1} height={30} />
        )}
      </div>
    </footer>
  );
};

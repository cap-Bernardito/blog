import cn from "classnames";
import React from "react";

import css from "./article-footer.module.scss";

type ArticleFooterProps = {
  className?: string;
};

export const ArticleFooter: React.FC<React.PropsWithChildren<ArticleFooterProps>> = ({ className, children }) => {
  return (
    <footer className={cn(css.root, className)}>
      <div className="sr-only">Тэги</div>
      <div className={cn(css.tags)}>{children}</div>
    </footer>
  );
};

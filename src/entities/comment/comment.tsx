import cn from "classnames";
import React, { ReactElement } from "react";

import { Avatar } from "shared/ui/avatar";
import { Skeleton } from "shared/ui/skeleton";

import css from "./comment.module.scss";

type CommentProps = {
  className?: string;
  img?: string;
  title?: string | ReactElement;
};

export const Comment: React.FC<React.PropsWithChildren<CommentProps>> = ({ className, img, title, children }) => {
  return (
    <div className={cn(css.root, className)}>
      <div className={cn(css.root__left)}>
        <Avatar url={img} />
      </div>
      <div className={cn(css.root__right)}>
        <div className={cn(css.title)}>{title || <Skeleton count={1} height={20} style={{ maxWidth: "300px" }} />}</div>
        <div className={cn(css.body)}>{children || <Skeleton count={5} height={18} />}</div>
      </div>
    </div>
  );
};

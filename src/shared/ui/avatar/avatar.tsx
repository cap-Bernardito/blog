import cn from "classnames";
import React, { ImgHTMLAttributes } from "react";

import { Skeleton } from "../skeleton";

import css from "./avatar.module.scss";

type SizesAvatar = "sm" | "md" | "xl";

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  url?: string;
  size?: SizesAvatar;
};

const sizesAvatar: Record<SizesAvatar, number> = {
  sm: 32,
  md: 48,
  xl: 128,
};

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, url, size = "md", ...otherProps } = props;

  return (
    <div className={cn(css.root, className, css[`root__${size}`])}>
      {url ? (
        <img
          className={cn(css.root__img)}
          width={sizesAvatar[size]}
          height={sizesAvatar[size]}
          src={url}
          alt=""
          data-testid="avatar-image"
          {...otherProps}
        />
      ) : (
        <Skeleton
          width={sizesAvatar[size]}
          height={sizesAvatar[size]}
          containerClassName={css.root__skeleton}
          containerTestId="avatar-placeholder"
        />
      )}
    </div>
  );
};

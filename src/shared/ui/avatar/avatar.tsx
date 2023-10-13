import cn from "classnames";
import React, { ImgHTMLAttributes } from "react";

import css from "./avatar.module.scss";

type SizesAvatar = "md" | "xl";

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  url: string;
  size?: SizesAvatar;
};

const sizesAvatar: Record<SizesAvatar, number> = {
  md: 48,
  xl: 128,
};

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, url, size = "md", ...otherProps } = props;

  return (
    <img
      className={cn(css.root, className, "img_adaptive", "img_round")}
      width={sizesAvatar[size]}
      height={sizesAvatar[size]}
      src={url}
      alt=""
      {...otherProps}
    />
  );
};

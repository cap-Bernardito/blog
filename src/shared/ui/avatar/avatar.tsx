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
    <div className={cn(css.root, className, css[`root__${size}`])}>
      <img
        className={cn(css.root__img)}
        width={sizesAvatar[size]}
        height={sizesAvatar[size]}
        src={url}
        alt=""
        {...otherProps}
      />
    </div>
  );
};

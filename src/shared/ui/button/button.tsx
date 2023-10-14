import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import css from "./button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
  ICON = "icon",
}

export enum ButtonColor {
  SECONDARY = "secondary",
  SUCCESS = "success",
  ERROR = "error",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant, color, ...otherProps } = props;

  return (
    <button className={cn(css.root, className, variant && css[variant], color && css[color])} {...otherProps} ref={ref}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

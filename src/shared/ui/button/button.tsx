import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import css from "./button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
  ICON = "icon",
}

export enum ButtonColor {
  SECONDARY = "secondary",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const { className, children, variant, color, ...otherProps } = props;

  return (
    <button className={cn(css.root, className, css[variant], css[color])} {...otherProps}>
      {children}
    </button>
  );
};

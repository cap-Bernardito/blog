import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import css from "./button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
  OUTLINE = "outline",
  ICON = "icon",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const { className, children, variant, ...otherProps } = props;

  return (
    <button className={cn(css.root, className, css[variant])} {...otherProps}>
      {children}
    </button>
  );
};

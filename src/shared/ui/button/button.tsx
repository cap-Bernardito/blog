import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import css from "./button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: ButtonVariant;
};

export const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, variant, ...otherProps } = props;

  return (
    <button className={cn(css.root, className, css[variant])} {...otherProps}>
      {children}
    </button>
  );
};

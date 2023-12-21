import cn from "classnames";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

import css from "./button.module.scss";

export enum ButtonVariant {
  CLEAR = "clear",
  ICON = "icon",
  TAB = "tab",
  DEFAULT = "default",
}

export enum ButtonColor {
  SECONDARY = "secondary",
  SUCCESS = "success",
  ERROR = "error",
  DARK = "dark",
  DEFAULT = "default",
}

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

type AsProp<C extends React.ElementType> = {
  as?: C extends "button" | "a" ? C : never;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = object> = React.PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = object> = PolymorphicComponentProp<
  C,
  Props
> & { ref?: PolymorphicRef<C> };

export type ButtonProps<C extends React.ElementType> = PolymorphicComponentPropWithRef<
  C,
  {
    className?: string;
    variant?: ButtonVariant;
    color?: ButtonColor;
    to?: LinkProps["to"];
  } & (C extends "a" ? LinkProps : object)
>;

export type ButtonComponent = <C extends React.ElementType>(props: ButtonProps<C>) => React.ReactNode | null;

export const Button: ButtonComponent = React.forwardRef(function Button<C extends React.ElementType = "button">(
  props: ButtonProps<C>,
  ref?: PolymorphicRef<C>,
) {
  const { as, to, className, children, variant, color, ...otherProps } = props;

  if (as === "a") {
    return (
      <Link
        to={to || ""}
        className={cn(css.root, className, variant && css[variant], color && css[color])}
        {...otherProps}
        ref={ref}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(css.root, className, variant && css[variant], color && css[color])} {...otherProps} ref={ref}>
      {children}
    </button>
  );
});

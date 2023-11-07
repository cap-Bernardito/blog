import cn from "classnames";
import React, { ReactElement, SelectHTMLAttributes } from "react";

import css from "./select.module.scss";

export const SelectOption: React.FC<React.PropsWithChildren<{ value?: string }>> = ({ children, value }) => (
  <option value={value}>{children}</option>
);

type BaseSelectProps<T extends string> = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  label: string;
  value: T;
  noLabel?: boolean;
  error?: string;
  children: ReactElement[];
  changeHandler?: (value: T) => void;
};

type PolymorphicComponentProp<C extends React.ElementType, Props = object> = React.PropsWithChildren<Props> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props>;

type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = object> = PolymorphicComponentProp<
  C,
  Props
> & { ref?: React.ComponentPropsWithRef<C>["ref"] };

type SelectProps<C extends React.ElementType, T extends string> = PolymorphicComponentPropWithRef<
  C,
  BaseSelectProps<T>
>;

type SelectComponent = <C extends React.ElementType, T extends string>(
  props: SelectProps<C, T>,
) => React.ReactNode | null;

export const Select: SelectComponent = React.forwardRef(function Select<
  C extends React.ElementType = "select",
  T extends string = "",
>(props: SelectProps<C, T>, ref?: React.ComponentPropsWithRef<C>["ref"]) {
  const { className, label, id, error, children, changeHandler, noLabel, ...otherProps } = props;
  const fieldHint = `${otherProps.name}-error-info`;

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (changeHandler) {
      changeHandler(e.target.value as T);
    }
  };

  return (
    <div className={cn(css.root, className)}>
      <select
        className={css.root__field}
        id={id}
        ref={ref}
        onChange={onChangeHandler}
        {...otherProps}
        aria-describedby={error ? fieldHint : undefined}
      >
        {children}
      </select>
      <label className={cn(css.root__label, { ["sr-only"]: noLabel })} htmlFor={id}>
        {label}
      </label>
      {error && (
        <div className={cn(css.root__error, css["error-active"])}>
          <div className={cn(css.root__error_inner)} id={fieldHint}>
            {error}
          </div>
        </div>
      )}
    </div>
  );
});

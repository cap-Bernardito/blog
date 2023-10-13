import cn from "classnames";
import React, { ReactElement, SelectHTMLAttributes } from "react";

import css from "./select.module.scss";

export const SelectOption: React.FC<React.PropsWithChildren> = ({ children }) => <option>{children}</option>;

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  label: string;
  value: string;
  error?: string;
  children: ReactElement[];
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, label, id, error, children, ...otherProps } = props;
  const fieldHint = `${otherProps.name}-error-info`;

  return (
    <div className={cn(css.root, className)}>
      <select
        className={css.root__field}
        id={id}
        ref={ref}
        {...otherProps}
        aria-describedby={error ? fieldHint : undefined}
      >
        {children}
      </select>
      <label className={css.root__label} htmlFor={id}>
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

Select.displayName = "Select";

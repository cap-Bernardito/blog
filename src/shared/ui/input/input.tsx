import React, { InputHTMLAttributes } from "react";
import cn from "classnames";
import css from "./input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  value: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, type = "text", label, id, error, ...otherProps } = props;

  return (
    <div className={cn(css.root, className)}>
      <input className={css.root__input} type={type} id={id} ref={ref} {...otherProps} />
      <label className={css.root__label} htmlFor={id}>
        {label}
      </label>
      {error && (
        <div className={cn(css.root__error, css["error-active"])}>
          <div className={cn(css.root__error_inner)}>{error}</div>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

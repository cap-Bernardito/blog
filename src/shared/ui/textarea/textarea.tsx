import cn from "classnames";
import React, { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

import css from "./textarea.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  label: string;
  value?: string;
  error?: string;
  onChange?: React.ChangeEventHandler;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className, label, id, error, rows = 1, placeholder, value, ...otherProps } = props;
  const fieldHint = `${otherProps.name}-error-info`;
  const [rowsCount, setRowCount] = useState<number>(rows);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const field = taRef.current;
    const div = divRef.current;

    if (!field || !div) {
      return;
    }

    const fieldHeight = div.scrollHeight;
    const lineHeight = Number.parseFloat(getComputedStyle(div).lineHeight);

    if (isNaN(fieldHeight) || isNaN(lineHeight)) {
      return;
    }

    const estimatedRows = Math.ceil(fieldHeight / lineHeight - 1);

    setRowCount(estimatedRows > 7 ? 7 : Math.max(estimatedRows, 1));
  }, [ref, value]);

  return (
    <div className={cn(css.root, className)}>
      <div className={cn(css.root__sizer)} ref={divRef} role="none">
        {value}
      </div>
      <textarea
        className={css.root__field}
        id={id}
        rows={rowsCount}
        ref={(node) => {
          taRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        placeholder={placeholder}
        value={value}
        {...otherProps}
        aria-describedby={error ? fieldHint : undefined}
      />
      <label className={"sr-only"} htmlFor={id}>
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

Textarea.displayName = "Textarea";

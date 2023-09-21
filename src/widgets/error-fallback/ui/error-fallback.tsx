import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "shared/ui/button";
import css from "./error-fallback.module.scss";

type ErrorFallbackProps = {
  className?: string;
};

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ className }) => {
  const { resetBoundary } = useErrorBoundary();
  const { t } = useTranslation();

  return (
    <div className={cn(css.root, className)}>
      <h2>Что-то пошло не так...</h2>
      <div className={css.resetButton}>
        <Button onClick={resetBoundary}>{t("Попробуйте снова")}</Button>
      </div>
    </div>
  );
};

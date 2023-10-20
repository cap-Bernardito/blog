import cn from "classnames";
import hljs from "highlight.js/lib/core";
import React, { useCallback, useEffect, useRef } from "react";

import CopyIcon from "shared/assets/icons/copy.svg";

import { Button, ButtonColor, ButtonVariant } from "../button";

import { Language, loadLanguageModule } from "./lib/import-languages";

import css from "./code.module.scss";

type CodeProps = {
  className?: string;
  children: string;
  language?: Language;
};

export const Code: React.FC<CodeProps> = (props) => {
  const { className, children, language = "javascript" } = props;
  const nodeRef = useRef<HTMLPreElement>(null);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(children);
  }, [children]);

  useEffect(() => {
    if (!nodeRef.current) {
      return;
    }

    loadLanguageModule(language).then((module) => {
      hljs.registerLanguage(language, module.default);

      nodeRef.current && hljs.highlightElement(nodeRef.current);
    });
  }, [language]);

  return (
    <div className={cn(css.root, className)}>
      <Button
        className={cn(css.copy__btn)}
        variant={ButtonVariant.ICON}
        color={ButtonColor.SECONDARY}
        onClick={handleClick}
        title="Скопировать"
      >
        <CopyIcon />
      </Button>
      <pre ref={nodeRef}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

import cn from "classnames";
import hljs from "highlight.js/lib/core";
import React, { useCallback, useEffect, useRef } from "react";

import CopyIcon from "../../assets/icons/copy.svg";
import { Button } from "../button";

import { Language, loadLanguageModule } from "./lib/import-languages";

import css from "./code.module.scss";

type CodeProps = {
  className?: string;
  children: string;
  language?: Language;
};

export const Code: React.FC<CodeProps> = (props) => {
  const { className, children } = props;
  const language = props.language ? props.language : "javascript";
  const nodeRef = useRef<HTMLPreElement>(null);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(children);
  }, [children]);

  useEffect(() => {
    loadLanguageModule(language).then((module) => {
      module && hljs.registerLanguage(language, module.default);

      if (!nodeRef.current || nodeRef.current.dataset.highlighted === "yes") {
        return;
      }

      hljs.highlightElement(nodeRef.current);
    });
  }, [language]);

  return (
    <div className={cn(css.root, className)}>
      <Button className={cn(css.copy__btn)} variant="icon" color="secondary" onClick={handleClick} title="Скопировать">
        <CopyIcon />
      </Button>
      <pre ref={nodeRef}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

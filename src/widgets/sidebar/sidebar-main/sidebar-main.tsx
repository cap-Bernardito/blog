import React, { useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { ThemeButton } from "features/theme-switcher";
import { LangSwitcher } from "features/lang-switcher";
import { Button, ButtonVariant } from "shared/ui/button";
import ArrowBottom from "shared/assets/icons/arrow-bottom.svg";
import css from "./sidebar-main.module.scss";

type SidebarMainProps = {
  className?: string;
};

export const SidebarMain: React.FC<SidebarMainProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={cn(css.root, className, { [css["collapsed"]]: collapsed })} data-testid="sidebar">
      <div className={cn(css.root__main)}>
        {t("Сайдбар")}
        <br />
        <Button
          className={css.root__toggle}
          data-testid="sidebar-toggle"
          variant={ButtonVariant.CLEAR}
          onClick={() => setCollapsed((state) => !state)}
        >
          <ArrowBottom className={css.root__toggle_icon} width={32} height={32} viewBox="0 0 32 32" />
        </Button>
      </div>
      <div className={cn(css.root__switchers)}>
        <ThemeButton />
        <LangSwitcher />
      </div>
    </div>
  );
};

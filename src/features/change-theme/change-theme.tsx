import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import { useThemeSwitcher } from "entities/theme";

import { Button } from "shared/ui/button";

import Icon from "shared/assets/icons/theme.svg";

type ChangeThemeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ChangeTheme: React.FC<ChangeThemeProps> = ({ className }) => {
  const themeSwitcher = useThemeSwitcher();

  return (
    <Button className={cn(className)} variant="icon" color="secondary" onClick={themeSwitcher} title="Переключить тему">
      <Icon />
    </Button>
  );
};

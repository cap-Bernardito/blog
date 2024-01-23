import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import { useThemeSwitcher } from "entities/theme";

import { Button, ButtonVariant } from "shared/ui/button";
import { ButtonColor } from "shared/ui/button/button";

import Icon from "shared/assets/icons/theme.svg";

type ChangeThemeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ChangeTheme: React.FC<ChangeThemeProps> = ({ className }) => {
  const themeSwitcher = useThemeSwitcher();

  return (
    <Button
      className={cn(className)}
      variant={ButtonVariant.ICON}
      color={ButtonColor.SECONDARY}
      onClick={themeSwitcher}
      title="Переключить тему"
    >
      <Icon />
    </Button>
  );
};

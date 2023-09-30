import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import { Button, ButtonVariant } from "shared/ui/button";
import { ButtonColor } from "shared/ui/button/button";

import Icon from "shared/assets/icons/theme.svg";

import { useTheme } from "../../model/useTheme";

type ThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={cn(className, theme)}
      variant={ButtonVariant.ICON}
      color={ButtonColor.SECONDARY}
      onClick={toggleTheme}
      title="Переключить тему"
    >
      <Icon />
    </Button>
  );
};

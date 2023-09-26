import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { Button, ButtonVariant } from "shared/ui/button";
import { useTheme } from "../../model/useTheme";
import Icon from "shared/assets/icons/theme.svg";
import { ButtonColor } from "shared/ui/button/button";

type ThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className={cn(className, theme)}
      variant={ButtonVariant.ICON}
      color={ButtonColor.SECONDARY_OUTLINE}
      onClick={toggleTheme}
      title="Переключить тему"
    >
      <Icon />
    </Button>
  );
};

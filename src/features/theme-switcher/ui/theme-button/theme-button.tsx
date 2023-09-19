import React, { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import { Button, ButtonVariant } from "shared/ui/button";
import { useTheme } from "../../model/useTheme";
import { Theme } from "../../model/theme-context";
import LightIcon from "shared/assets/icons/theme-light.svg";
import DarkIcon from "shared/assets/icons/theme-dark.svg";
import css from "./theme-button.module.scss";

type ThemeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button className={cn(css.root, className, theme)} variant={ButtonVariant.CLEAR} onClick={toggleTheme}>
      {theme === Theme.DARK ? <LightIcon /> : <DarkIcon />}
    </Button>
  );
};

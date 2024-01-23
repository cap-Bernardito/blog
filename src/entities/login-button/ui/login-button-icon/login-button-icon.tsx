import React from "react";

import { Button, ButtonColor, type ButtonProps } from "shared/ui/button";

import IconAvatar from "shared/assets/icons/avatar.svg";

type LoginButtonIconProps = ButtonProps<"button"> & {
  className?: string;
};

export const LoginButtonIcon: React.FC<LoginButtonIconProps> = ({ ...props }) => {
  return (
    <Button variant="icon" color={ButtonColor.SECONDARY} title="Перейти к авторизации" {...props}>
      <IconAvatar width={32} height={32} viewBox="0 0 32 32" />
    </Button>
  );
};

import React from "react";

import { Button, ButtonColor, ButtonProps, ButtonVariant } from "shared/ui/button";

type LoginButtonTextProps = ButtonProps<"button"> & {
  className?: string;
};

export const LoginButtonText: React.FC<LoginButtonTextProps> = ({ ...props }) => {
  return (
    <Button variant={ButtonVariant.DEFAULT} color={ButtonColor.DEFAULT} title="Перейти к авторизации" {...props}>
      Войти
    </Button>
  );
};

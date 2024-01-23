import React from "react";

import { Button, ButtonColor, ButtonProps } from "shared/ui/button";

type LoginButtonTextProps = ButtonProps<"button"> & {
  className?: string;
};

export const LoginButtonText: React.FC<React.PropsWithChildren<LoginButtonTextProps>> = ({ children, ...props }) => {
  return (
    <Button variant="default" color={ButtonColor.DEFAULT} title="Перейти к авторизации" {...props}>
      {children ? children : "Войти"}
    </Button>
  );
};

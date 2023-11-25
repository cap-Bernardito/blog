import { useCallback } from "react";

import { useAppDispatch } from "app/app-store";

import { useMeQuery } from "entities/user";

import { Avatar } from "shared/ui/avatar";
import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

import { logout } from "../../model/services/logout";

export const LogoutButton = () => {
  const { data: userProfile } = useMeQuery();
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Button onClick={handleClick} variant={ButtonVariant.ICON} color={ButtonColor.SECONDARY} aria-label="Выйти">
      <Avatar url={userProfile?.avatar} size="md" />
    </Button>
  );
};

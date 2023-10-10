import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { profileSelectors } from "entities/profile";
import { userActions } from "entities/user";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

export const LogoutProfileButton = () => {
  const userProfile = useAppSelector(profileSelectors.getProfileData);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    userProfile && (
      <Button onClick={handleClick} variant={ButtonVariant.ICON} color={ButtonColor.SECONDARY} title="Выйти">
        <img className="img_adaptive img_round" width={48} height={48} src={userProfile.avatar} alt="Разлогиниться" />
      </Button>
    )
  );
};

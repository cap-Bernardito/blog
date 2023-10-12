import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { profileSelectors } from "entities/profile";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

import { logout } from "../../model/services/logout";

export const LogoutButton = () => {
  const userProfile = useAppSelector(profileSelectors.getProfileData);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    userProfile && (
      <Button onClick={handleClick} variant={ButtonVariant.ICON} color={ButtonColor.SECONDARY} title="Выйти">
        <img className="img_adaptive img_round" width={48} height={48} src={userProfile.avatar} alt="" />
      </Button>
    )
  );
};

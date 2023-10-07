import React from "react";

import { useAppSelector } from "app/app-store";

import { profileSelectors } from "entities/profile";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";

export type LoginProfileButtonProps = {
  onClick?: () => void;
};

export const LoginProfileButton: React.FC<LoginProfileButtonProps> = ({ onClick }) => {
  const userProfile = useAppSelector(profileSelectors.getProfileData);

  return (
    userProfile && (
      <Button onClick={onClick} variant={ButtonVariant.ICON} color={ButtonColor.SECONDARY} title="Выйти">
        <img className="img_adaptive img_round" width={48} height={48} src={userProfile.avatar} alt="Разлогиниться" />
      </Button>
    )
  );
};

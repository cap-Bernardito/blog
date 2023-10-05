import React from "react";

import { routePaths } from "app/app-router/app-router-config";

import Profile from "shared/assets/icons/avatar.svg";
import Home from "shared/assets/icons/home.svg";
import Info from "shared/assets/icons/Info.svg";

export type SidebarNavItemType = {
  privateRoute?: boolean;
  path: string;
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const SidebarItemsList: SidebarNavItemType[] = [
  {
    path: routePaths.home,
    Icon: Home,
    title: "Главная",
  },
  {
    path: routePaths.about,
    Icon: Info,
    title: "О нас",
  },
  {
    privateRoute: true,
    path: routePaths.profile,
    Icon: Profile,
    title: "Профиль",
  },
];

import React from "react";

import { routeConfig, routePaths } from "app/app-router/app-router-config";

import { Session } from "entities/session";

import Article from "shared/assets/icons/article.svg";
import Profile from "shared/assets/icons/avatar.svg";
import Home from "shared/assets/icons/home.svg";
import Info from "shared/assets/icons/Info.svg";

export type SidebarNavItemType = {
  roles?: Session["role"][];
  privateRoute?: boolean;
  path: string;
  title: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const SidebarItemsList: SidebarNavItemType[] = [
  {
    privateRoute: routeConfig.home.isProtected,
    roles: routeConfig.home.roles,
    path: routePaths.home,
    Icon: Home,
    title: "Главная",
  },
  {
    privateRoute: routeConfig.about.isProtected,
    roles: routeConfig.about.roles,
    path: routePaths.about,
    Icon: Info,
    title: "О нас",
  },
  {
    privateRoute: routeConfig.profile.isProtected,
    roles: routeConfig.profile.roles,
    path: routePaths.profile,
    Icon: Profile,
    title: "Профиль",
  },
  {
    privateRoute: routeConfig.articles.isProtected,
    roles: routeConfig.articles.roles,
    path: routePaths.articles,
    Icon: Article,
    title: "Статьи",
  },
  {
    privateRoute: routeConfig.admin.isProtected,
    roles: routeConfig.admin.roles,
    path: routePaths.admin,
    Icon: Profile,
    title: "Админка",
  },
];

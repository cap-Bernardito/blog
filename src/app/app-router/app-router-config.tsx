import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/about-page";
import { AdminPage } from "pages/admin-page";
import { ArticlePage } from "pages/article-page";
import { ArticlesPage } from "pages/articles-page";
import { ForbiddenPage } from "pages/forbidden-page";
import { HomePage } from "pages/home-page";
import { NotFoundPage } from "pages/not-found-page";
import { ProfilePage } from "pages/profile-page";
import { UserPage } from "pages/user-page";
import { UsersPage } from "pages/users-page";

import { Session } from "entities/session";

type AppRouteProps = RouteProps & {
  isProtected?: boolean;
  roles?: Session["role"][];
};

export const enum AppRoutes {
  HOME = "home",
  ABOUT = "about",
  PROFILE = "profile",
  USERS = "users",
  USER = "user",
  ARTICLES = "articles",
  ARTICLE = "article",
  NOT_FOUND = "not_found",
  FORBIDDEN = "forbidden",
  ADMIN = "admin",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.USERS]: "/users",
  [AppRoutes.USER]: "/users/:id",
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLE]: "/articles/:id",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.ADMIN]: "/admin",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.HOME]: {
    path: routePaths[AppRoutes.HOME],
    element: <HomePage />,
  },
  [AppRoutes.ABOUT]: {
    path: routePaths[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: routePaths[AppRoutes.PROFILE],
    element: <ProfilePage />,
    isProtected: true,
    roles: ["ADMIN", "USER", "MANAGER"],
  },
  [AppRoutes.USERS]: {
    path: routePaths[AppRoutes.USERS],
    element: <UsersPage />,
    isProtected: true,
    roles: ["ADMIN", "USER", "MANAGER"],
  },
  [AppRoutes.USER]: {
    path: routePaths[AppRoutes.USER],
    element: <UserPage />,
    isProtected: true,
    roles: ["ADMIN", "USER", "MANAGER"],
  },
  [AppRoutes.ARTICLES]: {
    path: routePaths[AppRoutes.ARTICLES],
    element: <ArticlesPage />,
    isProtected: true,
    roles: ["ADMIN", "USER", "MANAGER"],
  },
  [AppRoutes.ARTICLE]: {
    path: routePaths[AppRoutes.ARTICLE],
    element: <ArticlePage />,
    isProtected: true,
    roles: ["ADMIN", "USER", "MANAGER"],
  },
  [AppRoutes.FORBIDDEN]: {
    path: routePaths[AppRoutes.FORBIDDEN],
    element: <ForbiddenPage />,
  },
  [AppRoutes.ADMIN]: {
    path: routePaths[AppRoutes.ADMIN],
    element: <AdminPage />,
    isProtected: true,
    roles: ["ADMIN"],
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePaths[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};

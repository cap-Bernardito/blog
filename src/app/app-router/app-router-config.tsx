import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/about-page";
import { HomePage } from "pages/home-page";
import { NotFoundPage } from "pages/not-found-page";
import { ProfilePage } from "pages/profile-page";

type AppRouteProps = RouteProps & {
  private?: boolean;
};

export const enum AppRoutes {
  HOME = "home",
  ABOUT = "about",
  PROFILE = "profile",
  NOT_FOUND = "not_found",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.ABOUT]: "about",
  [AppRoutes.PROFILE]: "profile",
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
    private: true,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePaths[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};

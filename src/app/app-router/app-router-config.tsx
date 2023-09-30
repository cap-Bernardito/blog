import { RouteProps } from "react-router-dom";

import { AboutPage } from "pages/about-page";
import { HomePage } from "pages/home-page";
import { NotFoundPage } from "pages/not-found-page";

export enum AppRoutes {
  HOME = "home",
  ABOUT = "about",
  NOT_FOUND = "not_found",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.ABOUT]: "about",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: routePaths[AppRoutes.HOME],
    element: <HomePage />,
  },
  [AppRoutes.ABOUT]: {
    path: routePaths[AppRoutes.ABOUT],
    element: <AboutPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePaths[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};

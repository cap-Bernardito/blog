import { AboutPage } from "pages/about-page";
import { HomePage } from "pages/home-page";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  HOME = "home",
  ABOUT = "about",
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.ABOUT]: "about",
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
};

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutArticles } from "app/layouts/layout-articles";
import { LayoutWithSidebar } from "app/layouts/layout-with-sidebar";

import { PageLoader } from "widgets/page-loader/page-loader";

import { routeConfig } from "./app-router-config";
import { ProtectedRoute } from "./protected-route";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithSidebar />}>
        {Object.values(routeConfig)
          .filter((route) => route.path !== routeConfig.articles.path)
          .map(({ path, element, isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<PageLoader />}>
                  {isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
                </Suspense>
              }
            />
          ))}
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutArticles />
          </ProtectedRoute>
        }
      >
        <Route
          path={routeConfig.articles.path}
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute>{routeConfig.articles.element}</ProtectedRoute>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

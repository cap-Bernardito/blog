import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "widgets/page-loader/page-loader";

import { LayoutArticle } from "../layouts/layout-article";
import { LayoutArticles } from "../layouts/layout-articles";
import { LayoutWithSidebar } from "../layouts/layout-with-sidebar";

import { routeConfig } from "./app-router-config";
import { ProtectedRoute } from "./protected-route";

const layoutWithSidebarExcludedPages = [routeConfig.articles.path, routeConfig.article.path];

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithSidebar />}>
        {Object.values(routeConfig)
          .filter((route) => !layoutWithSidebarExcludedPages.includes(route.path))
          .map(({ path, element, isProtected, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<PageLoader />}>
                  {isProtected ? <ProtectedRoute permissions={roles}>{element}</ProtectedRoute> : element}
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
              <ProtectedRoute permissions={routeConfig.articles.roles}>{routeConfig.articles.element}</ProtectedRoute>
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LayoutArticle />
          </ProtectedRoute>
        }
      >
        <Route
          path={routeConfig.article.path}
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute permissions={routeConfig.article.roles}>{routeConfig.article.element}</ProtectedRoute>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { LayoutWithSidebar } from "app/layouts/layout-with-sidebar";

import { PageLoader } from "widgets/page-loader/page-loader";

import { routeConfig } from "./app-router-config";
import { ProtectedRoute } from "./protected-route";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithSidebar />}>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>{element}</ProtectedRoute>
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

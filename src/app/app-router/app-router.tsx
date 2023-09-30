import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "widgets/page-loader/page-loader";

import { routeConfig } from "./app-router-config";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <main className="content__main">{element}</main>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
};

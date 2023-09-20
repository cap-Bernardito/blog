import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "./app-router-config";
import { PageLoader } from "widgets/page-loader/page-loader";

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
                <div className="content__main">{element}</div>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
};

import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "./app-router-config";

export const AppRouter = () => {
  return (
    <>
      <Suspense fallback={<>...Loading</>}>
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

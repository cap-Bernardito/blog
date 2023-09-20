import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { routeConfig } from "./app-router-config";

export const AppRouter = () => {
  const { t } = useTranslation();

  return (
    <>
      <Suspense fallback={<>{t("Загрузка")}</>}>
        <Routes>
          {Object.values(routeConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={<div className="content__main">{element}</div>} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};

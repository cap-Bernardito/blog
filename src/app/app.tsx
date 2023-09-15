import { Link, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import cn from "classnames";
import { AboutPage } from "pages/about-page";
import { HomePage } from "pages/home-page";
import { useTheme } from "shared/lib/toglle_theme";
import "./styles/index.scss";

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={cn("app", `app-${theme}`)}>
      <button onClick={toggleTheme}>Сменить тему</button>
      <br />
      <br />
      <Link to="/">Главная</Link>
      <Link to="/about">О нас</Link>
      <hr />
      <br />
      <Suspense fallback={<>...Loading</>}>
        <Routes>
          <Route path="about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

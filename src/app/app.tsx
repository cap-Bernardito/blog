import { Link, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { AboutPage } from "pages/about-page";
import { HomePage } from "pages/home-page";
import "./styles/style.scss";

export const App = () => (
  <div className="app">
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

import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/sidebar";
import { AppRouter } from "./app-router";
import "./styles/index.scss";

export const App = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Sidebar className="content__sidebar" />
        <AppRouter />
      </div>
    </>
  );
};

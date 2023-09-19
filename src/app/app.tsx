import cn from "classnames";
import { useTheme } from "features/theme-switcher";
import { Navbar } from "widgets/navbar";
import { Sidebar } from "widgets/sidebar";
import { AppRouter } from "./app-router";
import "./styles/index.scss";

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={cn("app", `app-${theme}`)}>
      <Navbar />
      <div className="content">
        <Sidebar className="content__sidebar" />
        <AppRouter />
      </div>
    </div>
  );
};

import cn from "classnames";
import { useTheme } from "shared/lib/toglle_theme";
import { Navbar } from "widgets/navbar";
import { AppRouter } from "./app-router";
import "./styles/index.scss";

export const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={cn("app", `app-${theme}`)}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>Сменить тему</button>
    </div>
  );
};

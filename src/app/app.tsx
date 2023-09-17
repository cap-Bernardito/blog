import { Link } from "react-router-dom";
import cn from "classnames";
import { useTheme } from "shared/lib/toglle_theme";
import "./styles/index.scss";
import { AppRouter } from "./app-router";

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
      <AppRouter />
    </div>
  );
};

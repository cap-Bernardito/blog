import cn from "classnames";
import { useTheme, ThemeButton } from "features/theme-switcher";
import { Navbar } from "widgets/navbar";
import { AppRouter } from "./app-router";
import "./styles/index.scss";

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={cn("app", `app-${theme}`)}>
      <Navbar />
      <AppRouter />
      <ThemeButton />
    </div>
  );
};

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "app/app";
import { ThemeProvider } from "shared/lib/toglle_theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { App } from "app/app";
import { ThemeProvider } from "features/theme-switcher";
import { ErrorFallback } from "widgets/error-fallback";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <ErrorBoundary fallback={<ErrorFallback />}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </ErrorBoundary>,
);

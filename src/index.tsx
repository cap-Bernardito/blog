import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { App } from "app/app";
import { ThemeProvider } from "features/theme-switcher";
import { ErrorFallback } from "widgets/error-fallback";
import { appStore } from "app/app-store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <ErrorBoundary fallback={<ErrorFallback />}>
    <StoreProvider store={appStore}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  </ErrorBoundary>,
);

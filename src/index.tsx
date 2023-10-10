import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "app/app";
import { appStore } from "app/app-store";

import { ErrorFallback } from "widgets/error-fallback";

import { ThemeProvider } from "entities/theme";

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

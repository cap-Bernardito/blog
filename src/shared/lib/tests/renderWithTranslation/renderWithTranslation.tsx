import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18nForTests from "shared/config/i18n/i18nForTests";

export function renderWithRouterAndTranslation(component: React.ReactNode) {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
    </BrowserRouter>,
  );
}

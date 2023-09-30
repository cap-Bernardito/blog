import { DeepPartial } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { appStore, makeStore, RootState } from "app/app-store";

import i18nForTests from "shared/config/i18n/i18nForTests";

export type ComponentRenderOptions = {
  route?: string;
  initialState?: DeepPartial<RootState>;
};

export function componentRender(component: React.ReactNode, options: ComponentRenderOptions = {}) {
  const { route = "/", initialState } = options;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const store = initialState ? makeStore(initialState) : appStore;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </MemoryRouter>
    </Provider>,
  );
}

import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { appStore, AppStoreWithReducerManager, makeStore, StateSchema } from "app/app-store";

import i18nForTests from "../../config/i18n/i18nForTests";

export type ComponentRenderOptions = {
  route?: string;
  initialState?: StateSchema;
};

type ComponentRenderFn = {
  (component: React.ReactNode, options?: ComponentRenderOptions): RenderResult;
  store?: AppStoreWithReducerManager;
};

export const componentRender: ComponentRenderFn = function (component, options = {}) {
  const { route = "/", initialState } = options;

  const store = initialState ? makeStore(initialState) : appStore;

  componentRender.store = store as AppStoreWithReducerManager;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </MemoryRouter>
    </Provider>,
  );
};

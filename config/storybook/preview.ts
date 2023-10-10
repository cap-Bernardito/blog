import type { Preview } from "@storybook/react";

import { Theme } from "../../src/features/theme-switcher/model/theme-context";
import { withI18n } from "../../src/shared/config/storybook/decorators/with-I18n";
import { withRouter } from "../../src/shared/config/storybook/decorators/with-router";
import { getWithStore } from "../../src/shared/config/storybook/decorators/with-store";
import { withStyles } from "../../src/shared/config/storybook/decorators/with-styles";
import { withTheme } from "../../src/shared/config/storybook/decorators/with-theme";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: Theme.LIGHT, icon: "circlehollow", title: Theme.LIGHT },
          { value: Theme.DARK, icon: "circle", title: Theme.DARK },
        ],
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [withStyles, withTheme, withRouter, withI18n, getWithStore()];

export default preview;

import type { Preview } from "@storybook/react";
import { Theme } from "../../src/features/theme-switcher/model/theme-context";
import { StyleDecorator } from "../../src/shared/config/storybook/decorators/style-decorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/decorators/theme-decorator";
import { RouterDecorator } from "../../src/shared/config/storybook/decorators/router-decorator";
import { I18nDecorator } from "../../src/shared/config/storybook/decorators/i18n-decorator";

const preview: Preview = {
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

export const decorators = [StyleDecorator, ThemeDecorator(Theme.LIGHT), RouterDecorator, I18nDecorator];

export default preview;
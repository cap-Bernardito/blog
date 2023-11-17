import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";

import { withI18n } from "../../src/shared/config/storybook/decorators/with-I18n";
import { withRouter } from "../../src/shared/config/storybook/decorators/with-router";
import { getWithStore } from "../../src/shared/config/storybook/decorators/with-store";
import { withStyles } from "../../src/shared/config/storybook/decorators/with-styles";
import { withTheme } from "../../src/shared/config/storybook/decorators/with-theme";

// import avatar from "./public/tigger.jpg";

initialize({}, [
  // Loki failed to load
  // rest.get("http://get.avatar", async (_, res, ctx) => {
  //   const image = await fetch(avatar).then((res) => res.arrayBuffer());
  //   return res(
  //     ctx.set("Content-Length", image.byteLength.toString()),
  //     ctx.set("Content-Type", "image/png"),
  //     ctx.body(image),
  //   );
  // }),
]);

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "light" },
          { value: "dark", icon: "circle", title: "dark" },
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

export const decorators = [withStyles, withTheme, withRouter, withI18n, getWithStore(), mswDecorator];

export default preview;

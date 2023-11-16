import { type Decorator } from "@storybook/react";

import "../../i18n/i18nForTests";

export const withI18n: Decorator = (StoryFn) => StoryFn();

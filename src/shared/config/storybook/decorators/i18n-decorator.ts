import { StoryFn } from "@storybook/react";

import "shared/config/i18n/i18nForTests";

export const I18nDecorator = (story: () => StoryFn) => story();

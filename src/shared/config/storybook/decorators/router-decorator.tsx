import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export const RouterDecorator = (story: () => StoryFn) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <BrowserRouter>{story()}</BrowserRouter>;
};

import { type Decorator } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export const withRouter: Decorator = (StoryFn) => {
  return <BrowserRouter>{StoryFn()}</BrowserRouter>;
};

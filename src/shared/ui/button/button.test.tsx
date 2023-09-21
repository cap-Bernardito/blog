import { render, screen } from "@testing-library/react";
import { Button, ButtonVariant } from "./button";

describe("Button", () => {
  it("should be render", () => {
    render(<Button>TEST</Button>);

    expect(screen.getByText("TEST")).toBeInTheDocument();
  });

  it("should apply passed class", () => {
    render(<Button variant={ButtonVariant.CLEAR}>TEST</Button>);

    expect(screen.getByText("TEST")).toHaveClass("clear");
  });
});

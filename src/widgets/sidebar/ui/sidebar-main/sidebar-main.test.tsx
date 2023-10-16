import { fireEvent, screen } from "@testing-library/react";

import { componentRender } from "shared/lib/tests/component-render";

import { SidebarMain as Sidebar } from "./sidebar-main";

describe("Sidebar", () => {
  it("should be defined", () => {
    componentRender(<Sidebar />);

    expect(screen.getByTestId("sidebar")).toBeDefined();
  });

  it("should contain a toggle button", () => {
    componentRender(<Sidebar />);

    const toggleBtn = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("sidebar-toggle")).toBeDefined();
  });

  it("should switch", () => {
    componentRender(<Sidebar />);

    const toggleBtn = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});

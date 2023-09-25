import { fireEvent, screen } from "@testing-library/react";
import { SidebarMain as Sidebar } from "./sidebar-main";
import { renderWithRouterAndTranslation } from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe("Sidebar", () => {
  it("should be defined", () => {
    renderWithRouterAndTranslation(<Sidebar />);

    expect(screen.getByTestId("sidebar")).toBeDefined();
  });

  it("should contain a toggle button", () => {
    renderWithRouterAndTranslation(<Sidebar />);

    const toggleBtn = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("sidebar-toggle")).toBeDefined();
  });

  it("should switch", () => {
    renderWithRouterAndTranslation(<Sidebar />);

    const toggleBtn = screen.getByTestId("sidebar-toggle");
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});

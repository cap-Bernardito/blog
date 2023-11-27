import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { baseApi } from "shared/api";
import { componentRender } from "shared/lib/tests/component-render";

import { LogoutButton } from "../ui/logout-button";

describe("logout", () => {
  beforeEach(() => {
    componentRender.store?.dispatch(baseApi.util.resetApiState());
  });

  const setup = (isAuth = false) => {
    const user = userEvent.setup();
    const utils = componentRender(<LogoutButton />);

    if (isAuth) {
      const mockedWindowDocumentCookie = jest.spyOn(window.document, "cookie", "get");

      mockedWindowDocumentCookie.mockReturnValue("token=atata");
    }

    const logoutButton = screen.getByRole("button", { name: /выйти/i });

    return {
      user,
      logoutButton,
      utils,
    };
  };

  it("should render placeholder when user is not auth", async () => {
    setup(false);

    expect(screen.getByTestId("avatar-placeholder")).toBeInTheDocument();
  });

  it("should render image when user is available", async () => {
    setup(true);

    await waitFor(() => {
      expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
    });
  });

  it("should change image on placeholder after clicking", async () => {
    const { user, logoutButton } = setup(true);

    await waitFor(() => {
      expect(screen.getByTestId("avatar-image")).toBeInTheDocument();

      componentRender.store?.dispatch(baseApi.util.resetApiState());
    });

    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByTestId("avatar-placeholder")).toBeInTheDocument();
    });
  });
});

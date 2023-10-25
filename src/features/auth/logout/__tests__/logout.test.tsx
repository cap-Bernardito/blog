import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { toSessionUserId } from "entities/session/api/types";
import { mapUser } from "entities/user/lib/map-user";

import { componentRender } from "shared/lib/tests/component-render";
import { testUser } from "shared/lib/tests/fixtures/fixtures";

import { LogoutButton } from "../ui/logout-button";

describe("logout", () => {
  const setup = (isAuth = false) => {
    const user = userEvent.setup();
    const utils = !isAuth
      ? componentRender(<LogoutButton />)
      : componentRender(<LogoutButton />, {
          initialState: {
            session: {
              isAuthorized: true,
              _isInit: true,
              accessToken: "atata",
              userId: toSessionUserId(1),
              isLoading: false,
              user: mapUser(testUser),
            },
          },
        });

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

    expect(screen.getByTestId("avatar-image")).toBeInTheDocument();
  });

  it("should change image on placeholder after clicking", async () => {
    const { user, logoutButton } = setup(true);
    expect(screen.getByTestId("avatar-image")).toBeInTheDocument();

    await user.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByTestId("avatar-placeholder")).toBeInTheDocument();
    });
  });
});

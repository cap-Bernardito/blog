import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { toSessionUserId } from "entities/session/api/types";
import { mapUser } from "entities/user/lib/map-user";

import { componentRender } from "shared/lib/tests/component-render";
import { testUser } from "shared/lib/tests/fixtures/fixtures";

import { LogoutButton } from "../ui/logout-button/logout-button";

describe("logout", () => {
  const setup = (isAuth = false) => {
    const user = userEvent.setup();
    const utils = !isAuth
      ? componentRender(<LogoutButton />)
      : componentRender(<LogoutButton />, {
          initialState: {
            session: { isAuthorized: true, _isInit: true, accessToken: "atata", userId: toSessionUserId(1) },
            user: { isLoading: false, data: mapUser(testUser) },
          },
        });

    const logoutButton = screen.queryByRole("button", { name: /выйти/i });

    return {
      user,
      logoutButton,
      utils,
    };
  };

  it("should not render when user is not auth", async () => {
    const { logoutButton } = setup();

    expect(logoutButton).not.toBeInTheDocument();
  });

  it("should be removed from the DOM after clicking", async () => {
    const { user, logoutButton } = setup(true);

    if (!logoutButton) {
      throw new Error("The button should not be available");
    }

    await user.click(logoutButton);

    await waitFor(() => {
      expect(logoutButton).not.toBeInTheDocument();
    });
  });
});

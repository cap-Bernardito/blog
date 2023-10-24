import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mapUser } from "entities/user/lib/map-user";

import { componentRender } from "shared/lib/tests/component-render";
import { testUser } from "shared/lib/tests/fixtures/fixtures";

import { LoginForm } from "../ui/login-form/login-form";

describe("login", () => {
  const setup = () => {
    const stub = jest.fn();
    const user = userEvent.setup();
    const utils = componentRender(<LoginForm onSuccess={stub} />);

    const formLogin = within(screen.getByRole("form"));
    const loginField = formLogin.getByRole("textbox", { name: "Логин" });
    const passwordField = formLogin.getByLabelText("Пароль");
    const submitButton = formLogin.getByRole("button", { name: /войти/i });

    return {
      user,
      formLogin,
      loginField,
      passwordField,
      submitButton,
      onSuccess: stub,
      utils,
    };
  };

  it("should show error when username field is not valid", async () => {
    const { user, loginField, passwordField, submitButton } = setup();

    await user.type(loginField, "0");
    await user.type(passwordField, "valid");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("От 3 знаков")).toBeInTheDocument();
    });
  });

  it("should show error when password field is not valid", async () => {
    const { user, loginField, passwordField, submitButton } = setup();

    await user.type(loginField, "username");
    await user.type(passwordField, "0");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("От 3 знаков")).toBeInTheDocument();
    });
  });

  it("should show error when user is not valid", async () => {
    const { user, loginField, passwordField, submitButton } = setup();

    await user.type(loginField, "username");
    await user.type(passwordField, "invalid");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Login or password is incorrect")).toBeInTheDocument();
    });
  });

  it("should show receiving data message", async () => {
    const { user, loginField, passwordField, submitButton } = setup();

    await user.type(loginField, "username");
    await user.type(passwordField, "invalid");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Получение данных")).toBeInTheDocument();
    });
  });

  it("should store contain session and user data when user is valid", async () => {
    const { user, loginField, passwordField, submitButton } = setup();

    await user.type(loginField, "username");
    await user.type(passwordField, "valid");
    await user.click(submitButton);

    await waitFor(() => {
      expect(componentRender.store?.getState().session.isAuthorized).toBe(true);
    });

    await waitFor(() => {
      expect(componentRender.store?.getState().session.user).toEqual(mapUser(testUser));
    });
  });

  it("should fire onSuccessCallback when user is valid", async () => {
    const { user, loginField, passwordField, submitButton, onSuccess } = setup();

    await user.type(loginField, "username");
    await user.type(passwordField, "valid");
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSuccess.mock.calls).toHaveLength(1);
    });
  });
});

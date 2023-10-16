import { fireEvent, getByLabelText, getByRole, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mapUser } from "entities/user/lib/map-user";

import { componentRender } from "shared/lib/tests/component-render";
import { testUser } from "shared/lib/tests/fixtures/fixtures";

import { LoginForm } from "../ui/login-form/login-form";

describe("login", () => {
  const setup = () => {
    const stub = jest.fn();
    const utils = componentRender(<LoginForm onSuccess={stub} />);

    const formLogin = screen.getByRole("form");
    const loginField = getByRole(formLogin, "textbox", { name: "Логин" });
    const passwordField = getByLabelText(formLogin, "Пароль");
    const submitButton = getByRole(formLogin, "button", { name: /войти/i });

    return {
      formLogin,
      loginField,
      passwordField,
      submitButton,
      onSuccess: stub,
      utils,
    };
  };

  it("should render the form", async () => {
    const { loginField, passwordField, submitButton } = setup();

    expect(loginField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show error when username field is not valid", async () => {
    const { loginField, passwordField, submitButton } = setup();

    fireEvent.change(loginField, { target: { value: 0 } });
    fireEvent.change(passwordField, { target: { value: "valid" } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("От 3 знаков")).toBeInTheDocument();
    });
  });

  it("should show error when password field is not valid", async () => {
    const { loginField, passwordField, submitButton } = setup();

    fireEvent.change(loginField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: 0 } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("От 3 знаков")).toBeInTheDocument();
    });
  });

  it("should show error when user is not valid", async () => {
    const { loginField, passwordField, submitButton } = setup();

    fireEvent.change(loginField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: "invalid" } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Request failed with status code 401")).toBeInTheDocument();
    });
  });

  it("should show receiving data message", async () => {
    const { loginField, passwordField, submitButton } = setup();

    fireEvent.change(loginField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: "invalid" } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Получение данных")).toBeInTheDocument();
    });
  });

  it("should store contain session and user data when user is valid", async () => {
    const { loginField, passwordField, submitButton } = setup();

    fireEvent.change(loginField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: "valid" } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(componentRender.store?.getState().session.isAuthorized).toBe(true);
    });

    await waitFor(() => {
      expect(componentRender.store?.getState().user).toEqual({
        isLoading: false,
        error: undefined,
        data: mapUser(testUser),
      });
    });
  });

  it("should fire onSuccessCallback when user is valid", async () => {
    const { loginField, passwordField, submitButton, onSuccess } = setup();

    fireEvent.change(loginField, { target: { value: "username" } });
    fireEvent.change(passwordField, { target: { value: "valid" } });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(onSuccess.mock.calls).toHaveLength(1);
    });
  });
});

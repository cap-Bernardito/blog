import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { sessionActions, toSessionUserId } from "entities/session";
import { userRTKApi } from "entities/user";

import { baseApi } from "shared/api";
import { componentRender } from "shared/lib/tests/component-render";

import { ChangeUserForm } from "../ui/change-user-form";

describe("change user form", () => {
  beforeEach(async () => {
    const mockedWindowDocumentCookie = jest.spyOn(window.document, "cookie", "get");

    mockedWindowDocumentCookie.mockReturnValue("token=atata");

    componentRender(<ChangeUserForm />);

    await act(async () => {
      componentRender.store?.dispatch(baseApi.util.resetApiState());
      componentRender.store?.dispatch(sessionActions.setAuth({ userId: toSessionUserId(1) }));
      await componentRender.store?.dispatch(userRTKApi.endpoints.me.initiate()).unwrap();
    });

    const user = userEvent.setup();

    const editButton = screen.getByRole("button", { name: "Редактировать профиль" });
    await user.click(editButton);
  });

  const setup = () => {
    const user = userEvent.setup();
    const userForm = within(screen.getByRole("form"));
    const saveButton = userForm.getByRole("button", { name: "Сохранить" });
    const input = userForm.getByLabelText("Имя");

    return {
      user,
      userForm,
      saveButton,
      input,
    };
  };

  it("should show HTTP client error", async () => {
    const { user, saveButton, input } = setup();

    await user.clear(input);
    await user.type(input, "generate HTTPError");

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Не получается")).toBeInTheDocument();
    });
  });

  it("should show receiving data message", async () => {
    const { user, saveButton, input } = setup();
    await user.clear(input);
    await user.type(input, "Вася-modified");

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Обновление данных")).toBeInTheDocument();
    });
  });

  it("should show success message when data was modified", async () => {
    const { user, saveButton, input } = setup();
    await user.clear(input);
    await user.type(input, "Вася-modified");

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Данные обновлены")).toBeInTheDocument();
    });
  });
});

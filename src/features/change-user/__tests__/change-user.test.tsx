import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { toSessionUserId } from "entities/session/api/types";
import { mapUser } from "entities/user/lib/map-user";

import { componentRender } from "shared/lib/tests/component-render";
import { testUser } from "shared/lib/tests/fixtures/fixtures";

import { ChangeUserForm } from "../ui/change-user-form";

describe("change user form", () => {
  beforeEach(async () => {
    componentRender(<ChangeUserForm />, {
      initialState: {
        session: { isAuthorized: true, _isInit: true, accessToken: "atata", userId: toSessionUserId(1) },
        user: { isLoading: false, data: mapUser(testUser) },
      },
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

    expect(screen.getByText("Обновление данных")).toBeInTheDocument();
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

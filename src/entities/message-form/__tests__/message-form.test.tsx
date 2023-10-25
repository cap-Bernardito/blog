import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { componentRender } from "shared/lib/tests/component-render";

import { MessageForm } from "../ui/message-form/index";

describe("message-form", () => {
  const setup = () => {
    const stub = jest.fn();
    const user = userEvent.setup();

    componentRender(<MessageForm onSubmit={stub} />);

    const userForm = within(screen.getByRole("form"));
    const input = userForm.getByLabelText("Введите комментарий");
    const submitButton = userForm.getByRole("button");

    return {
      user,
      userForm,
      input,
      submitButton,
      onSubmitStub: stub,
    };
  };

  it("should prevent submit when field is not valid", async () => {
    const { user, input, submitButton, onSubmitStub } = setup();
    await user.type(input, "0");

    await user.click(submitButton);

    expect(onSubmitStub).not.toHaveBeenCalled();
  });

  it("should show error when field is not valid", async () => {
    const { user, userForm, input, submitButton } = setup();
    await user.type(input, "0");

    await user.click(submitButton);

    expect(userForm.getByText("От 3 знаков")).toBeInTheDocument();
  });

  it("should call onSubmit callback with form data when success submit", async () => {
    const { user, input, submitButton, onSubmitStub } = setup();
    await user.type(input, "valid text");

    await user.click(submitButton);

    expect(onSubmitStub).toBeCalledWith({ message: "valid text" });
  });
});

import { ByRoleOptions, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { componentRender } from "shared/lib/tests/component-render";

import { UserForm } from "../ui/user-form";

import { fieldsZodResolver, formFields, formFieldsEmpty } from "./fixtures";

describe("login", () => {
  const setup = () => {
    const stub = jest.fn();
    const user = userEvent.setup();
    const fieldsInitValues = { ...formFields.defaults };

    componentRender(<UserForm formFields={formFields} onSubmit={stub} zodResolver={fieldsZodResolver} />);

    const userForm = within(screen.getByRole("form"));

    type Query = ByRoleOptions;

    const editButtonQuery: Query = { name: "Редактировать профиль" };
    const saveButtonQuery: Query = { name: "Сохранить" };
    const cancelButtonQuery: Query = { name: "Отмена" };

    return {
      user,
      userForm,
      editButtonQuery,
      saveButtonQuery,
      cancelButtonQuery,
      onSubmitStub: stub,
      fieldsInitValues,
    };
  };

  it("should not render form when fields in props.formFields is nullable", async () => {
    componentRender(<UserForm formFields={formFieldsEmpty} onSubmit={jest.fn()} />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("should render form with edit button", async () => {
    const { userForm, editButtonQuery, saveButtonQuery, cancelButtonQuery } = setup();
    const editButton = userForm.getByRole("button", editButtonQuery);
    const saveButton = userForm.queryByRole("button", saveButtonQuery);
    const cancelButton = userForm.queryByRole("button", cancelButtonQuery);
    const input = userForm.getByLabelText("Имя");

    // Доступна только кнопка редактировать, инпуты в disabled
    expect(editButton).toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();
    expect(input).toHaveAttribute("disabled");
  });

  it("should render 'save' and 'cancel' buttons when 'edit' button was pressed", async () => {
    const { user, userForm, editButtonQuery, saveButtonQuery, cancelButtonQuery } = setup();
    let editButton = userForm.queryByRole("button", editButtonQuery);
    await user.click(editButton!);

    // После нажатия на "Редактировать" доступны только кнопки "Сохранить" и "Отмена", инпуты в editable
    editButton = userForm.queryByRole("button", editButtonQuery);
    const input = userForm.getByLabelText("Имя");
    const saveButton = userForm.queryByRole("button", saveButtonQuery);
    const cancelButton = userForm.queryByRole("button", cancelButtonQuery);

    expect(editButton).not.toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveAttribute("disabled");
    expect(input).not.toHaveAttribute("disabled");
  });

  it("should reset form when 'cancel' button was pressed", async () => {
    const { user, userForm, editButtonQuery, cancelButtonQuery } = setup();
    const editButton = userForm.getByRole("button", editButtonQuery);
    const input = userForm.getByLabelText("Имя");
    await user.click(editButton);
    await user.type(input, "-modified");
    expect(input).toHaveAttribute("value", "Вася-modified");
    let cancelButton = userForm.queryByRole("button", cancelButtonQuery);

    // После нажатия кнопки "Отмена" форма сбрасывается на начальное состояние
    await user.click(cancelButton!);
    cancelButton = userForm.queryByRole("button", cancelButtonQuery);

    expect(cancelButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(input).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("value", "Вася");
  });

  it("should show error when field is not valid", async () => {
    const { user, userForm, editButtonQuery, saveButtonQuery } = setup();
    const editButton = userForm.getByRole("button", editButtonQuery);
    const input = userForm.getByLabelText("Имя");
    await user.click(editButton);
    await user.clear(input);
    await user.type(input, "0");
    const saveButton = userForm.getByRole("button", saveButtonQuery);

    await user.click(saveButton);

    expect(userForm.getByText("От 3 знаков")).toBeInTheDocument();
  });

  it("should call onSubmit callback with form data when success submit", async () => {
    const { user, userForm, editButtonQuery, saveButtonQuery, onSubmitStub, fieldsInitValues } = setup();
    const editButton = userForm.getByRole("button", editButtonQuery);
    const input = userForm.getByLabelText("Имя");
    await user.click(editButton);
    await user.type(input, "-modified");
    const saveButton = userForm.getByRole("button", saveButtonQuery);

    await user.click(saveButton);

    expect(onSubmitStub).toBeCalledWith({ ...fieldsInitValues, first: `${fieldsInitValues.first}-modified` });
  });
});

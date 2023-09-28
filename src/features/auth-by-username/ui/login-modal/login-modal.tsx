import { Modal, useModal } from "shared/ui/modal";
import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";
import IconAvatar from "shared/assets/icons/avatar.svg";
import { LoginForm } from "../login-form/login-form";

export const LoginModal = () => {
  const modal = useModal();

  return (
    <>
      <Button
        onClick={modal.openModal}
        variant={ButtonVariant.ICON}
        color={ButtonColor.SECONDARY}
        title="Перейти к авторизации"
      >
        <IconAvatar width={32} height={32} viewBox="0 0 32 32" />
      </Button>

      {modal.modalIsOpen && (
        <Modal onClose={modal.closeModal} title="Авторизация">
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

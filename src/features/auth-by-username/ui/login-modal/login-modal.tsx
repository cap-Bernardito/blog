import { useCallback, useEffect } from "react";
import { Modal, useModal } from "shared/ui/modal";
import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";
import IconAvatar from "shared/assets/icons/avatar.svg";
import { userSelectors, userActions } from "entities/user";
import { useAppSelector, useAppDispatch } from "app/app-store";
import { LoginForm } from "../login-form/login-form";

export const LoginModal = () => {
  const modal = useModal();
  const user = useAppSelector(userSelectors.getAuthData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      modal.closeModal();
    }
  }, [modal, user]);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <>
      {user ? (
        <Button onClick={onLogout} variant={ButtonVariant.ICON} color={ButtonColor.SECONDARY} title="Выйти">
          <IconAvatar width={32} height={32} viewBox="0 0 32 32" />
        </Button>
      ) : (
        <Button
          onClick={modal.openModal}
          variant={ButtonVariant.ICON}
          color={ButtonColor.SECONDARY}
          title="Перейти к авторизации"
        >
          <IconAvatar width={32} height={32} viewBox="0 0 32 32" />
        </Button>
      )}

      {modal.modalIsOpen && (
        <Modal onClose={modal.closeModal} title="Авторизация">
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

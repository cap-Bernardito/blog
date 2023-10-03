import { Suspense, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useAppDispatch, useAppSelector } from "app/app-store";

import { ErrorFallback } from "widgets/error-fallback";

import { userActions, userSelectors } from "entities/user";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";
import { Loader } from "shared/ui/loader/loader";
import { Modal, useModal } from "shared/ui/modal";

import IconAvatar from "shared/assets/icons/avatar.svg";

import { LoginForm } from "../login-form";

export const LoginModal = () => {
  const modal = useModal();
  const user = useAppSelector(userSelectors.getAuthData);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
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
          <Suspense fallback={<Loader />}>
            <LoginForm onSuccess={modal.closeModal} />
          </Suspense>
        </Modal>
      )}
    </ErrorBoundary>
  );
};

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useAppSelector } from "app/app-store";

import { LoginForm } from "features/auth/login";
import { LogoutButton } from "features/auth/logout";

import { ErrorFallback } from "entities/error-fallback";
import { sessionSelectors } from "entities/session";

import { Button, ButtonColor, ButtonVariant } from "shared/ui/button";
import { Loader } from "shared/ui/loader/loader";
import { Modal, useModal } from "shared/ui/modal";

import IconAvatar from "shared/assets/icons/avatar.svg";

export const LoginModal = () => {
  const modal = useModal();
  const isAuth = useAppSelector(sessionSelectors.isAuth);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {isAuth ? (
        <LogoutButton />
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

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { useAppSelector } from "app/app-store";

import { LoginForm } from "features/auth/login";
import { LogoutButton } from "features/auth/logout";

import { ErrorFallback } from "entities/error-fallback";
import { LoginButtonIcon, LoginButtonText } from "entities/login-button";
import { sessionSelectors } from "entities/session";

import { Loader } from "shared/ui/loader/loader";
import { Modal, useModal } from "shared/ui/modal";

type LoginModalProps = {
  LoginButton?: typeof LoginButtonIcon | typeof LoginButtonText;
};

export const LoginModal: React.FC<LoginModalProps> = ({ LoginButton }) => {
  const modal = useModal();
  const isAuth = useAppSelector(sessionSelectors.isAuth);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {isAuth ? (
        <LogoutButton />
      ) : LoginButton ? (
        <LoginButton onClick={modal.openModal} />
      ) : (
        <LoginButtonIcon onClick={modal.openModal} />
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

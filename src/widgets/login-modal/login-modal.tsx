import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoginForm } from "features/auth/login";
import { LogoutButton } from "features/auth/logout";

import { ErrorFallback } from "entities/error-fallback";
import { LoginButtonIcon, LoginButtonText } from "entities/login-button";
import { withAuth } from "entities/session";

import { Loader } from "shared/ui/loader/loader";
import { Modal, type TModal, useModal } from "shared/ui/modal";

type LoginModalProps = {
  LoginButton?: typeof LoginButtonIcon | typeof LoginButtonText;
};

const UserLoginModal = withAuth({
  Authorized: LogoutButton,
  UnAuthorized: ({ modal, LoginButton }: { modal: TModal; LoginButton?: LoginModalProps["LoginButton"] }) => {
    return LoginButton ? <LoginButton onClick={modal?.openModal} /> : <LoginButtonIcon onClick={modal?.openModal} />;
  },
});

export const LoginModal: React.FC<LoginModalProps> = ({ LoginButton }) => {
  const modal = useModal();

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <UserLoginModal modal={modal} LoginButton={LoginButton} />

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

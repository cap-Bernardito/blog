import React, { useEffect, useRef } from "react";
import cn from "classnames";
import FocusLock from "react-focus-lock";
import CloseIcon from "shared/assets/icons/close.svg";
import { Portal } from "shared/ui/portal/portal";
import { Button, ButtonVariant } from "shared/ui/button";
import { Overlay } from "../../overlay/overlay";
import css from "./modal.module.scss";

type ModalProps = {
  className?: string;
  title?: string;
  onClose: () => void;
};

const bodyClass = "modal-opened";
const modalRoot = document.getElementById("modals") as HTMLDivElement;
const documentBody = document.querySelector("body") as HTMLBodyElement;

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ className, title, onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    documentBody.classList.add(bodyClass);

    return () => documentBody.classList.remove(bodyClass);
  }, []);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <Portal root={modalRoot}>
      <Overlay />
      <FocusLock returnFocus={true}>
        <div
          className={cn(css.root, className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal_title" : undefined}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className={cn(css.root__inner)} ref={overlayRef} onClick={handleClose}>
            <div
              className={cn(css.root__content, {
                [css.root__content_withoutHeader]: !title,
              })}
            >
              <Button
                className={cn(css.close)}
                onClick={onClose}
                variant={ButtonVariant.ICON}
                data-test-id="modal-close-button"
                title="Закрыть модальное окно"
              >
                <CloseIcon width={24} height={24} viewBox="0 0 24 24" />
              </Button>
              {title && (
                <h2 className={cn(css.header, "text text_type_main-large")} id="modal_title">
                  {title}
                </h2>
              )}
              <div className={cn(css.body, "text text_type_main-default")}>{children}</div>
            </div>
          </div>
        </div>
      </FocusLock>
    </Portal>
  );
};

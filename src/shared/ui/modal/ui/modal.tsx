import React, { useEffect, useRef } from "react";
import cn from "classnames";
import { Overlay } from "../../overlay/overlay";
import CloseIcon from "shared/assets/icons/close.svg";
import css from "./modal.module.scss";
import { Portal } from "shared/ui/portal/portal";

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
      <div className={cn(css.root, className)}>
        <div className={cn(css.root__inner)} ref={overlayRef} onClick={handleClose}>
          <div
            className={cn(css.root__content, {
              [css.root__content_withoutHeader]: !title,
            })}
          >
            <div className={cn(css.close)} onClick={onClose} data-test-id="modal-close-button">
              <CloseIcon width={24} height={24} viewBox="0 0 24 24" />
            </div>
            {title && <div className={cn(css.header, "text text_type_main-large")}>{title}</div>}
            <div className={cn(css.body, "text text_type_main-default")}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

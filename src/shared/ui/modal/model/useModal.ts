import { useState } from "react";

export type TModal = {
  modalIsOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

export const useModal = (initialState = false): TModal => {
  const [modalIsOpen, setModalIsOpen] = useState(initialState);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return { modalIsOpen, closeModal, openModal };
};

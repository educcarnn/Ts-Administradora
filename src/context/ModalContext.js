import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        openModal,
        closeModal,
        selectedOption,
        handleOptionSelection,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

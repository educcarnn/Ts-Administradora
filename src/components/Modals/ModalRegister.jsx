import React, { useState } from 'react';
import Modal from 'react-modal';

const RegistrationModal = ({ isOpen, onClose, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectOption(option); // Chame a função passada pelo componente pai com a opção selecionada
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Registro Modal"
    >
      <h2>Escolha o tipo de registro:</h2>
      <button onClick={() => handleOptionClick('Física')}>Registro Física</button>
      <button onClick={() => handleOptionClick('Jurídica')}>Registro Jurídica</button>
    </Modal>
  );
};

export default RegistrationModal;
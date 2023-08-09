import React, { useState } from 'react';
import { SidebarContainer, SidebarItem, SidebarInfo } from './style';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal'; // Importe o react-modal
import './modal.css'; // Importe o arquivo de estilo do modal

const itemInfo = {
  Clientes: 'Adicione novos clientes',
  Imóveis: 'Mais informações sobre imóveis',
  Receita: 'Informações sobre Receita',
  Despesa: 'Informações sobre Despesa',
  Empresa: 'Informações sobre Empresa',
};

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const history = useHistory();

  const handleItemMouseEnter = (item) => {
    setActiveItem(item);
  };

  const handleItemMouseLeave = () => {
    setActiveItem(null);
  };

  const handleSidebarItemClick = (item) => {
    if (item === 'Clientes') {
      setIsModalOpen(true);
    } else if (item === 'Imóveis') {
      handleImoveisClick(); // Redireciona para a página de imóveis do ZAP Pro
    }
  };

  const handleImoveisClick = () => {
    history.push('/imoveis-zap-pro'); // Redireciona para a página de imóveis
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const handleJuridicaClick = () => {
    history.push('/clientes-pessoa-fisica');
    handleModalClose();
  };

  const handleFisicaClick = () => {
    history.push('/clientes-pessoa-juridica');
    handleModalClose();
  };

  return (
    <SidebarContainer>
      <div>
        {Object.keys(itemInfo).map((item) => (
          <SidebarItem
            key={item}
            onMouseEnter={() => handleItemMouseEnter(item)}
            onMouseLeave={handleItemMouseLeave}
            onClick={() => handleSidebarItemClick(item)}
          >
            {item}
          </SidebarItem>
        ))}
      </div>
      <SidebarInfo>
        {activeItem && <p>{itemInfo[activeItem]}</p>}
      </SidebarInfo>

    
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Escolha o tipo de cliente:</h2>
        <button onClick={handleFisicaClick}>Jurídica</button>
        <button onClick={handleJuridicaClick}>Física</button>
      </Modal>
    </SidebarContainer>
  );
}


export default Sidebar;

import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@chakra-ui/react";
import "./modal.css";

const itemInfo = {
  Clientes: "Adicione novos clientes",
  Imóveis: "Mais informações sobre imóveis",
  Contratos: "Mais informações sobre contratos",
  Receita: "Informações sobre Receita",
  Despesa: "Informações sobre Despesa",
  Empresa: "Informações sobre Empresa",
};

const SidebarContainer = styled.div`
  background-color: #06064b;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarItem = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
`;

const AdditionalInfo = styled.div`
  background-color: white;
  color: #333;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5%;
  justify-content: center;
  border-top: 1px solid #ddd;
`;

const DivList = styled.div`
  display: flex;
  gap: 2%;
  background-color: #06064b;
  color: white;
`;

const ModalContent = styled.div`
  text-align: center;
  padding: 20px;
`;

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const [showImoveisOptions, setShowImoveisOptions] = useState(false);

  const handleItemMouseEnter = (item) => {
    setActiveItem(item);
  };

  const handleItemMouseLeave = () => {
    setActiveItem(null);
  };

  const handleSidebarItemClick = (item) => {
    if (item === "Clientes") {
      setIsModalOpen(true);
    } else if (item === "Imóveis") {
      setShowImoveisOptions(true);
    }
  };

  const handleImoveisClick = () => {
    history.push("/imoveis");
    setShowImoveisOptions(false);
  };
  const handleCadastroClick = () => {
    history.push("/cadastro");
    setShowImoveisOptions(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleJuridicaClick = () => {
    history.push("/clientes-pessoa-fisica");
    handleModalClose();
  };

  const handleFisicaClick = () => {
    history.push("/clientes-pessoa-juridica");
    handleModalClose();
  };

  return (
    <div>
      <DivList>
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
      </DivList>
      <SidebarContainer>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          className="modal"
          overlayClassName="overlay"
        >
          <ModalContent>
            <h2>Escolha o tipo de cliente:</h2>
            <Button onClick={handleFisicaClick}>Jurídica</Button>
            <Button onClick={handleJuridicaClick}>Física</Button>
          </ModalContent>
        </Modal>
      </SidebarContainer>
      <SidebarContainer>
        <Modal
          isOpen={showImoveisOptions}
          onRequestClose={() => setShowImoveisOptions(false)}
          className="modal"
          overlayClassName="overlay"
        >
          <ModalContent>
          <h2>Opções para imóveis:</h2>
            <Button
              mt={2}
              colorScheme="teal"
              onClick={handleCadastroClick}
              variant="outline"
            >
              Link para cadastro de imóveis
            </Button>
            <Button mt={2} colorScheme="teal" onClick={handleImoveisClick}>
              Novo Imóvel
            </Button>
            <Button
              mt={2}
              colorScheme="teal"
              onClick={handleImoveisClick}
              variant="outline"
            >
              Lista de imóveis
            </Button>
          </ModalContent>
        </Modal>
      </SidebarContainer>
    </div>
  );
}

export default Sidebar;

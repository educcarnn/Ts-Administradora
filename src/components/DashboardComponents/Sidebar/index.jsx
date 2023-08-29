import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@chakra-ui/react";
import "./modal.css";
import ListaPessoaFísica from "../../../pages/Dashboard/Cadastro/ListaPessoaFisica";
import ListaPessoaJuridica from "../../../pages/Dashboard/Cadastro/ListaPessoaJuridica";

const itemInfo = {
  Início: "Início do Site",
  Clientes: "Adicione novos clientes",
  Imóveis: "Mais informações sobre imóveis",
  Contratos: "Mais informações sobre contratos",
  //Receita: "Informações sobre Receita",
  // Despesa
  Empresa: "Informações sobre Empresa",
  Cadastrar: "Informações sobre Empresa",
};

const SidebarContainer = styled.div``;

const SidebarItem = styled.div`
  padding: 10px 20px;
  max-width: 100%;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const AdditionalInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
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
  border-radius: 10px;
  margin-top: 10px;
`;

const DivList = styled.div`
  display: flex;
  gap: 2%;
  background: linear-gradient(135deg, #06064b, #4747d1);
  color: white;
  padding: 10px;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;
`;

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImoveisOptions, setShowImoveisOptions] = useState(false);
  const [showContratosOptions, setShowContratosOptions] = useState(false);
  const history = useHistory();

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
    } else if (item === "Contratos") {
      setShowContratosOptions(true);
    } else if (item === "Início") {
      handleInicioClick(); // Chama a função para redirecionar para o início
    } else if (item === "Cadastrar") {
      handleCadastrar(); // Chama a função para redirecionar para o início
    }
  };

  // ...
  const handleCadastrar = () => {
    history.push("/cadastrar-admin");
  };
  const handleInicioClick = () => {
    history.push("/dashboard"); // Aqui definimos o caminho para o dashboard. Modifique conforme necessário.
  };

  const handleImoveisClick = () => {
    history.push("/imoveis");
    setShowImoveisOptions(false);
  };

  const handleContratoClick = () => {
    history.push("/novo-contrato");
    setShowImoveisOptions(false);
    setShowContratosOptions(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowImoveisOptions(false);
    setShowContratosOptions(false);
  };

  const handleClienteClick = () => {
    history.push("/fiador");
    handleModalClose();
  };

  const handleInquilinoClick = () => {
    history.push("/inquilino");
    handleModalClose();
  };

  const handleProprietárioClick = () => {
    history.push("/proprietario");
    handleModalClose();
  };

  const handleListaImoveisCadastrados = () => {
    history.push("/imoveis-cadastrados");
    handleModalClose();
  };

  const handleListaContrato = () => {
    history.push("/obter-contratos");
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
            <h2>Opções para clientes: </h2>
            <Button onClick={handleInquilinoClick}>Inquilino</Button>

            <Button onClick={handleProprietárioClick}>Proprietário</Button>

            <Button onClick={handleClienteClick}>Fiador</Button>
          </ModalContent>
        </Modal>

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
              variant="outline"
              onClick={handleListaImoveisCadastrados}
            >
              Lista de imóveis
            </Button>

            <Button mt={2} colorScheme="teal" onClick={handleImoveisClick}>
              Novo Imóvel
            </Button>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={showContratosOptions}
          onRequestClose={() => setShowContratosOptions(false)}
          className="modal"
          overlayClassName="overlay"
        >
          <ModalContent>
            <h2>Opções para contratos:</h2>
            <Button
              mt={2}
              colorScheme="teal"
              variant="outline"
              onClick={handleListaContrato}
            >
              Lista de Contratos
            </Button>
            <Button mt={2} colorScheme="teal" onClick={handleContratoClick}>
              Novo Contrato
            </Button>
          </ModalContent>
        </Modal>
      </SidebarContainer>
    </div>
  );
}

export default Sidebar;

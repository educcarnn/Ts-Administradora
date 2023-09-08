import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { Button } from "@chakra-ui/react";
import "../../../components/DashboardComponents/Sidebar/modal.css"
import { Popover, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const itemInfo = {
  Início: "Início do Site",
  Imóveis: "Mais informações sobre imóveis",
  /*Contratos: "Mais informações sobre contratos"*/
 
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
const OptionsContainer = styled.div`
  display: ${(props) => (props.item === props.active ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  z-index: 3;
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
  z-index: 2;
  position: relative;

  @media (max-width: 800px) {
    flex-direction: column;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    z-index: 2;
    position: relative;
  }
`;

const HamburgerIconContainer = styled.div`
  display: none;
  background: linear-gradient(135deg, #06064b, #4747d1);
  color: white;
  @media (max-width: 800px) {
    display: block;
    z-index: 2;
    position: relative;
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

const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    background-color: #06064b;
    color: white;
    border-radius: 5px;
    padding: 10px;
  }
`;

const StyledTypography = styled(Typography)`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

function SidebarUser () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImoveisOptions, setShowImoveisOptions] = useState(false);
  const [showContratosOptions, setShowContratosOptions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeItem, setActiveItem] = useState("");

  const history = useHistory();

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setActiveItem("");
  };

  const open = Boolean(anchorEl);

  const handleItemMouseEnter = (item) => {
    setActiveItem(item);
  };

  const handleItemMouseLeave = () => {
    setActiveItem(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSidebarItemClick = (item) => {
    setActiveItem(""); 
    setAnchorEl(null);
  
    switch (item) {
      case "Início":
        history.push("/user/dashboard");
        break;

      default:
 
        if (itemInfo[item]) {
          setActiveItem(item);
          const clickedElement = document.querySelector(
            `[data-sidebar-item="${item}"]`
          );
          setAnchorEl(clickedElement);
        } else {
          history.push(`/user/${item.toLowerCase()}`);
        }
    }
  };

  const handleImoveisClick = () => {
    history.push("/user/imoveis-cadastrados");
    setShowImoveisOptions(false);
  };

  const handleContratoClick = () => {
    history.push("/user/novo-contrato");
    setShowImoveisOptions(false);
    setShowContratosOptions(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShowImoveisOptions(false);
    setShowContratosOptions(false);
  };


  const handleListaImoveisCadastrados = () => {
    history.push("/user/imovel-cadastro");
    handleModalClose();
  };

  const handleListaContrato = () => {
    history.push("/user/obter-contratos");
    handleModalClose();
  };

  return (
    <div>
      <HamburgerIconContainer onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </HamburgerIconContainer>
      <DivList isOpen={isMenuOpen}>
        {Object.keys(itemInfo).map((item) => (
          <SidebarItem
            key={item}
            data-sidebar-item={item}
            onClick={() => handleSidebarItemClick(item)}
          >
            {item}
          </SidebarItem>
        ))}
        <StyledPopover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onMouseLeave={handlePopoverClose}
        >
          {activeItem === "Imóveis" && (
            <>
              <StyledTypography onClick={handleListaImoveisCadastrados}>
                Novo Imóvel
              </StyledTypography>
              <StyledTypography onClick={handleImoveisClick}>
               Seus Imóveis
              </StyledTypography>
            </>
          )}

          {activeItem === "Contratos" && (
            <>
              <StyledTypography onClick={handleListaContrato}>
                Lista de Contratos
              </StyledTypography>
              <StyledTypography onClick={handleContratoClick}>
                Novo Contrato
              </StyledTypography>
            </>
          )}
        </StyledPopover>
      </DivList>
    </div>
  );
}

export default SidebarUser;

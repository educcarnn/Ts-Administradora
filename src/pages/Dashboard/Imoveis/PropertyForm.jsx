import React, { useState } from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@material-ui/core";
import ResidencialForm from "./ResidencialForm.js";
import ComercialForm from "./ComercialForm";
import { LocationFields } from "../../../components/Imoveis/LocationFields.jsx";
import ProprietyFields from "../../../components/Imoveis/ProprietyFields.jsx";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { DashboarDiv } from "../style.js";
import CaracteristicasCondominio from "../../../components/Imoveis/TipsComponents/CaracateristicasCondominio.jsx";
import CaracteristicasImovel from "../../../components/Imoveis/TipsComponents/CaracteristicasImovel.jsx";
import { useFormularioContext } from "../../../context/CadastroProvider.js"; // Importar o contexto aqui
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TipoNegociacao from "../../../components/Imoveis/TipsNegociation/TipsNegociation.jsx";
import Isencao from "../../../components/Imoveis/TipsNegociation/Isencao.jsx";
import Sidebar from "../../../components/DashboardComponents/Sidebar/index.jsx";
import imovel from "../../../assets/Videos/imovel.mp4";
import { useModal } from "../../../context/ModalContext.js";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Anexos from "../../../components/Imoveis/Docs.jsx";
import AnuncioForm from "../../../components/Imoveis/Ads.jsx";
import AnexosFoto from "../../../components/Imoveis/Fotos.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    minHeight: "100vh",
    fontSize: "0.8rem",
    width: "100%",
    color: "black", // Altera a cor do texto para preto
  },
  formBox: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
    padding: "20px",
    width: "100%",
  },
  actionButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "teal",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  switchText: {
    margin: "0 1rem",
  },
  videoBackground: {
    position: "fixed",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",

    transform: "translate(-50%, -50%)",
  },
}));

const BlackText = styled(FormLabel)`
  color: black;
  font-weight: bold;
`;

const Container = styled.div`
  background-color: #f5f5f5db;
  z-index: 2;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PropertyForm = () => {
  const classes = useStyles();
  const { isModalOpen } = useModal();
  const [isCommercial, setIsCommercial] = useState("Comercial");
  const [propertyType, setPropertyType] = useState("Comercial");

  const { onSubmit, handleSubmit, register, setValue } = useFormularioContext();

  const handleSwitchChange = (event) => {
    const tipo = event.target.checked ? "Comercial" : "Residencial";
    setPropertyType(tipo);
    setIsCommercial(event.target.checked);

    // Atualiza o valor no contexto do formulário diretamente aqui.
    setValue("tipoImovel", tipo);
  };

  return (
    <div>
      <DashboarDiv variant="h4">
        Ts Administradora - Novo Imóvel
      </DashboarDiv>
      {!isModalOpen && <Sidebar />}
      {!isModalOpen && (
        <video className={classes.videoBackground} autoPlay loop muted>
          <source src={imovel} type="video/mp4" />
          Seu navegador não suporta vídeos em formato HTML5.
        </video>
      )}
      <div className={classes.root}>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.switchContainer}>
              <BlackText>Tipo de Imóvel</BlackText>
              <FormControlLabel
                control={
                  <Switch
                    checked={propertyType === "Comercial"}
                    onChange={handleSwitchChange}
                    color="primary"
                    name="tipoImovel"
                  />
                }
                label="Comercial"
              />
            </div>
            {propertyType === "Residencial" ? (
              <ResidencialForm />
            ) : (
              <ComercialForm />
            )}
            <TipoNegociacao />
            <Isencao />
            <ProprietyFields />
            <LocationFields />
            <AnuncioForm />
            <Anexos />
            <AnexosFoto />
            <CaracteristicasImovel />
            <CaracteristicasCondominio />
            <ToastContainer />
            <button className={classes.actionButton} type="submit">
              Adicione Imóvel
            </button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default PropertyForm;

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Switch,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import ResidencialForm from "./ResidencialForm.js";
import ComercialForm from "./ComercialForm";
import { LocationFields } from "../../../components/Imoveis/LocationFields.jsx";

import ProprietyFields from "../../../components/Imoveis/ProprietyFields.jsx"
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { DashboarDiv } from "../style.js";
import CaracteristicasCondominio from "../../../components/Imoveis/TipsComponents/CaracateristicasCondominio.jsx";
import CaracteristicasImovel from "../../../components/Imoveis/TipsComponents/CaracteristicasImovel.jsx";
import { useFormularioContext } from '../../../context/CadastroProvider.js'; // Importar o contexto aqui
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
}));
const TextPage = styled(Typography)`
  color: white;
  background-color: #06064b;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlackText = styled(FormLabel)`
  color: black;
  font-weight: bold;
`;

const PropertyForm = () => {
  const classes = useStyles();
  const [showResidencialForm, setShowResidencialForm] = useState(false);
  const { dadosFormulario, setDadosFormulario, enviarFormulario} = useFormularioContext(); // Usar o contexto aqui
  const [propertyType, setPropertyType] = useState(""); // Inicializar como "comercial"

  const handlePropertyTypeChange = (event) => {
    const newPropertyType = event.target.value;
    setPropertyType(newPropertyType);

   
    setDadosFormulario((prevData) => ({
      ...prevData,
      tipoImovel: newPropertyType,
    }));

    console.log("Dados do formulário no contexto:", dadosFormulario);
  };

  const handleAddImovel = () => {

    const novoImovel = {
      tipoImovel: dadosFormulario.tipoImovel,
      generoImovel: dadosFormulario.generoImovel,
      caracteristicas: dadosFormulario.caracteristicas,
      tipoNegociacao: dadosFormulario.tipoNegociacao, 
    };

    enviarFormulario(novoImovel);

    console.log("Imóvel adicionado:", novoImovel);
  };

  return (
    <div>
      <DashboarDiv variant="h4">
        Ts Administradora - Lista de Imóvel
      </DashboarDiv>
      <div className={classes.root}>
        <div className={classes.switchContainer}>
          <BlackText>Tipo de Imóvel</BlackText>
          <FormControl>
            <Select value={propertyType} onChange={handlePropertyTypeChange}>
              <MenuItem value="comercial">Comercial</MenuItem>
              <MenuItem value="residencial">Residencial</MenuItem>
            </Select>
          </FormControl>
        </div>
        {propertyType === "residencial" ? (
          <ResidencialForm />
        ) : (
          <ComercialForm />
        )}
        <ProprietyFields />
        <LocationFields />
        <CaracteristicasImovel />
        <CaracteristicasCondominio />
        <ToastContainer/>
        <button className={classes.actionButton} onClick={handleAddImovel}>Adicione Imóvel</button>
      </div>
    </div>
  );
};

export default PropertyForm;

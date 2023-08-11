import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import ResidencialForm from "./ResidencialForm.js";
import ComercialForm from "./ComercialForm";
import { LocationFields } from "../../../../components/Imoveis/LocationFields";
import TipsNegociation from "../../../../components/Imoveis/TipsNegociation";
import { ProprietyFields } from "../../../../components/Imoveis/ProprietyFields.jsx";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    color: "black", // Altera a cor do texto para preto
    padding: "20px",
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

const FormInput = styled(FormControl)`
  width: 50%;
`;

const MenuWhite = styled(MenuItem)`
  color: black; // Altera a cor do texto para preto
`;

const StyledSelect = styled(Select)`
  color: white;
  &:focus {
    background-color: transparent;
  }
`;

const PropertyForm = () => {
  const classes = useStyles();
  const [propertyType, setPropertyType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setShowForm(true);
  };

  return (
    <div>
      <TextPage variant="h4">Ts Administradora - Anúncio de imóvel</TextPage>
      <div className={classes.root}>
        <FormInput fullWidth>
          <BlackText>Tipo de Imóvel</BlackText>
          <StyledSelect
            value={propertyType}
            onChange={handlePropertyTypeChange}
            MenuProps={{ classes: { paper: "menuPaper" } }}
          >
            <MenuWhite value="">Selecione</MenuWhite>
            <MenuWhite value="residencial">Residencial</MenuWhite>
            <MenuWhite value="comercial">Comercial</MenuWhite>
          </StyledSelect>
        </FormInput>
        {showForm && (
          <>
            {propertyType === "residencial" && <ResidencialForm />}
            {propertyType === "comercial" && <ComercialForm />}
          </>
        )}
        <TipsNegociation />
        <ProprietyFields />
        <LocationFields />

        <Button className={classes.actionButton}>Adicione Imóvel</Button>
      </div>
    </div>
  );
};

export default PropertyForm;

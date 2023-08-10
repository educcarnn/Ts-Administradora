import React, { useState } from "react";
import styled from "styled-components";
import ResidencialForm from "./ResidencialForm";
import ComercialForm from "./ComercialForm";
import { LocationFields } from "../../../../components/Imoveis/LocationFields";
import TipsNegociation from "../../../../components/Imoveis/TipsNegociation";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  color: black;
`;

const FormBox = styled.form`
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 20px;
`;

const PropertyForm = () => {
  const [propertyType, setPropertyType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setShowForm(true);
  };

  return (
    <Container>
      <h3>Registro de Novo Imóvel</h3>
      <FormBox>
        <label>Tipo de Imóvel</label>
        <select value={propertyType} onChange={handlePropertyTypeChange}>
          <option value="">Selecione</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
        </select>
        {showForm && (
          <>
            {propertyType === "residencial" && <ResidencialForm />}
            {propertyType === "comercial" && <ComercialForm />}
          </>
        )}
      </FormBox>
      <TipsNegociation />
      <LocationFields />

      <button mt={4} colorScheme="teal">
        Adicione Imóvel
      </button>
    </Container>
  );
};

export default PropertyForm;

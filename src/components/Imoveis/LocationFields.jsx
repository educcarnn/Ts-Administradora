import React from "react";
import styled from "styled-components";
import { Box, Container, Typography, TextField } from "@material-ui/core";

const StyledContainer = styled(Container)`
  margin: 0 auto;
  display: flex;
  background-color: blue;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;

  .text {
    color: black;
  }

  .textLocation {
    color: black;
  }
`;

const StyledFormBox = styled.form`
 
`;

const LocationFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaçamento vertical entre os campos */
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`

export const LocationFields = () => {
  return (
    <div>
      <TextPage >
        Localização
      </TextPage>
      <StyledFormBox>
        <TextField label="CEP" placeholder="Digite o CEP" fullWidth />
      </StyledFormBox>
      <StyledFormBox>
        <TextField label="Endereço" placeholder="Digite o endereço" fullWidth />
      </StyledFormBox>
      <StyledFormBox>
        <TextField label="Cidade" placeholder="Digite a cidade" fullWidth />
      </StyledFormBox>
      <StyledFormBox>
        <TextField label="Estado" placeholder="Digite o estado" fullWidth />
      </StyledFormBox>
    </div>
  );
};

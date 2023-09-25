import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Grid,
} from "@mui/material";
import styled from "styled-components";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

export default function CaracteristicasImovel({
  caracteristicasImovel,
  handleCaracteristicasImovel,
  isEditing,
}) {
  // Defina todas as características disponíveis
  const todasCaracteristicasDisponiveis = [
    'Aceita Animais',
    'ArCondicionado',
    'Closet',
    'CozinhaAmericana',
    'Lareira',
    'Mobiliado',
    'VarandaGourmet',
  ];

  useEffect(() => {
    // Não é necessário mais manter um estado local para características
    // O estado de características será gerenciado pelo pai usando `caracteristicasImovel`
  }, [caracteristicasImovel]);

  const handleCheckboxChange = (name) => {
    
    handleCaracteristicasImovel(name, !caracteristicasImovel.caracteristicas_imovel.includes(name));
  };

  return (
    <CenteredDiv>
      <TextPage>Características do Imóvel</TextPage>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormGroup>
              {todasCaracteristicasDisponiveis.map((caracteristica) => (
                <FormControlLabel
                  key={caracteristica}
                  control={
                    <Checkbox
                      name={caracteristica}
                      onChange={() => handleCheckboxChange(caracteristica)}
                      checked={caracteristicasImovel.caracteristicas_imovel.includes(caracteristica)}
                      disabled={!isEditing} // Desabilita os checkboxes quando não estiver editando
                    />
                  }
                  label={caracteristica
                    .split(/(?=[A-Z])/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </CenteredDiv>
  );
}

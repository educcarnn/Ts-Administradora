import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";
import styled from "styled-components"

function CaracteristicasImovel() {

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
`  

  const [caracteristicas, setCaracteristicas] = useState({
    aceitaAnimais: false,
    arCondicionado: false,
    closet: false,
    cozinhaAmericana: false,
    lareira: false,
    mobiliado: false,
    varandaGourmet: false,
  });

  const handleChange = (event) => {
    setCaracteristicas({
      ...caracteristicas,
      [event.target.name]: event.target.checked,
    });

  };

  return (
    <CenteredDiv>
      <TextPage>Características do Imóvel</TextPage>
      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.aceitaAnimais}
                onChange={handleChange}
                name="aceitaAnimais"
              />
            }
            label="Aceita Animais"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.arCondicionado}
                onChange={handleChange}
                name="arCondicionado"
              />
            }
            label="Ar-condicionado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.closet}
                onChange={handleChange}
                name="closet"
              />
            }
            label="Closet"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.cozinhaAmericana}
                onChange={handleChange}
                name="cozinhaAmericana"
              />
            }
            label="Cozinha Americana"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.lareira}
                onChange={handleChange}
                name="lareira"
              />
            }
            label="Lareira"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.mobiliado}
                onChange={handleChange}
                name="mobiliado"
              />
            }
            label="Mobiliado"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={caracteristicas.varandaGourmet}
                onChange={handleChange}
                name="varandaGourmet"
              />
            }
            label="Varanda Gourmet"
          />
        </FormGroup>
      </FormControl>
    </CenteredDiv>
  );
}

export default CaracteristicasImovel;
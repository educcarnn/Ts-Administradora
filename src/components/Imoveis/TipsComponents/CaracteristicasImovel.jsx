import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useFormularioContext } from "../../../context/CadastroProvider";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2%;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

function CaracteristicasImovel() {
  const { register, setValue, getValues } = useFormularioContext();

  const [caracteristicas, setCaracteristicas] = useState({
    "Aceita Animais": false,
    ArCondicionado: false,
    Closet: false,
    CozinhaAmericana: false,
    Lareira: false,
    Mobiliado: false,
    VarandaGourmet: false,
  });

  function handleChangeCheckbox(name, isChecked) {
    setCaracteristicas((prevState) => ({ ...prevState, [name]: isChecked }));

    const selectedFeatures = Object.keys(caracteristicas).filter((key) =>
      key === name ? isChecked : caracteristicas[key]
    );

    setValue("caracteristicas_imovel", selectedFeatures);
  }
  return (
    <CenteredDiv>
      <TextPage>Características do Imóvel</TextPage>
      <FormControl component="fieldset">
        <FormGroup>
          {Object.keys(caracteristicas).map((key) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!caracteristicas[key]}
                  onChange={(e) => handleChangeCheckbox(key, e.target.checked)}
                  name={key}
                />
              }
              label={key}
            />
          ))}
        </FormGroup>
      </FormControl>
    </CenteredDiv>
  );
}

export default CaracteristicasImovel;

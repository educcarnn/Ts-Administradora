import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  FormControlLabel,
  InputLabel,
  Input,
  TextField,
  Checkbox,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import styled from "styled-components";

import { useFormularioContext } from "../../../context/CadastroProvider"; // Importe o contexto de CadastroProvider

import Condominio from "./Condominio/condominio";
import IPTU from "./IPTU/iptu";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  flex-direction: column;
  color: "#FFFFFF";
  z-index: 1;
`;

export default function Isencao() {
  const { setValue } = useFormularioContext();

  const [isIptuExempt, setIsIptuExempt] = useState(true); // Estado para checkbox "Isento"
  const [isCondoExempt, setIsCondoExempt] = useState(true);

  const handleCheckboxChange = () => {
    setIsIptuExempt(!isIptuExempt);
    setValue("tipoIptu", isIptuExempt ? "NaoIsento" : "Isento"); // Defina o valor correto para "tipoIptu"
  };

  const handleCondoCheckboxChange = () => {
    setIsCondoExempt(!isCondoExempt);
    setValue("tipoCondominio", isCondoExempt ? "NaoIsento" : "Isento");
  };

  return (
    <CenterDiv>
      <FormControl fullWidth margin="normal">
        <Typography variant="h6">Condomínio:</Typography>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCondoExempt}
                onChange={handleCondoCheckboxChange}
                name="isCondoExempt"
                value="Isento"
              />
            }
            label="Isento"
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={!isCondoExempt}
                onChange={handleCondoCheckboxChange}
                name="isCondoNotExempt"
                value="NãoIsento"
              />
            }
            label="Não Isento"
          />
        </div>
      </FormControl>
      {!isCondoExempt && (
        <>
          <Condominio />
        </>
      )}
      <FormControl fullWidth margin="normal">
        <Typography variant="h6">IPTU:</Typography>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={isIptuExempt}
                onChange={handleCheckboxChange}
                name="isIptuExempt"
              />
            }
            label="Isento"
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={!isIptuExempt}
                onChange={handleCheckboxChange}
                name="isIptuNotExempt"
              />
            }
            label="Não Isento"
          />
        </div>
      </FormControl>

      {!isIptuExempt && (
        <>
          <IPTU />
        </>
      )}
    </CenterDiv>
  );
}

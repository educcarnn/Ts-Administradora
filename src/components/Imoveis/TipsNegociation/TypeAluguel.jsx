import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  FormControlLabel,
  Input,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import { useNegociacao } from "../../../context/NegociationProvider"; // Importe o hook useNegociacao

const DivContainer = styled.div`
  width: 50%;
`;
const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

const StyledTitleText = styled(Typography)`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FormControlLabelGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function TypeAluguel() {
  const [isCondoExempt, setIsCondoExempt] = useState(false);
  const [condoValue, setCondoValue] = useState("");
  const [isIptuExempt, setIsIptuExempt] = useState(false);
  const [iptuValue, setIptuValue] = useState("");
  const [rentalModalities, setRentalModalities] = useState({
    seguroFianca: true,
  });

  const handleCondoExemptChange = (event) => {
    setIsCondoExempt(event.target.checked);
  };

  const handleIptuExemptChange = (event) => {
    setIsIptuExempt(event.target.checked);
  };

  const handleCondoValueChange = (event) => {
    setCondoValue(event.target.value);
  };

  const handleIptuValueChange = (event) => {
    setIptuValue(event.target.value);
  };

  const handleRentalModalityChange = (event) => {
    const { name, checked } = event.target;
    setRentalModalities((prevModalities) => ({
      ...prevModalities,
      [name]: checked,
    }));
  };

  const CenterDiv = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */

`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px; /* Limita a largura do formulário */
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

const StyledTitleText = styled(Typography)`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FormControlLabelGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;



  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Administração (%)</WhiteFormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Locação (%)</WhiteFormLabel>
          <Input type="text" />
        </FormControl>

      </DivContainer>
    </CenterDiv>
  );
}

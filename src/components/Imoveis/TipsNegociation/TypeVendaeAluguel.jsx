import React from "react";
import { FormControl, FormLabel, Input, Checkbox } from "@material-ui/core";
import styled from "styled-components";
import { useState } from "react";
import { useNegociacao } from "../../../context/NegociationProvider"; // Importe o hook useNegociacao

const DivContainer = styled.div`
  width: 50%;
`;
const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

export default function TypeVendaeAluguel() {
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
    flex-direction: column;
    align-items: center;
  `;

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda</WhiteFormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação(%)</WhiteFormLabel>
          <Input type="text" />
        </FormControl>

      </DivContainer>
    </CenterDiv>
  );
}

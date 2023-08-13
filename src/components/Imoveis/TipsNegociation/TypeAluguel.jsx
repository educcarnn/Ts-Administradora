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


  return (
    <div>
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
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Condomínio: </WhiteFormLabel>
          <div>
            <Checkbox
              onChange={handleCondoExemptChange}
              checked={isCondoExempt}
              value="isento"
            />
            <WhiteFormLabel component="label" htmlFor="isento">
              Isento
            </WhiteFormLabel>
          </div>
          <div>
            <Checkbox
              onChange={() => setIsCondoExempt(false)}
              checked={!isCondoExempt}
              value="naoIsento"
            />
            <WhiteFormLabel component="label" htmlFor="naoIsento">
              Não Isento
            </WhiteFormLabel>
          </div>
          {!isCondoExempt && (
            <div>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Nome </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Razão Social</WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>CNPJ </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Site </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Login </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Senha </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Telefone Fixo </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Telefone Celular </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Valor Mensal</WhiteFormLabel>
                <Input type="text" />
              </FormControl>
            </div>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>IPTU:</WhiteFormLabel>
          <div>
            <Checkbox
              onChange={handleIptuExemptChange}
              checked={isIptuExempt}
              value="isento"
            />
            <WhiteFormLabel component="label" htmlFor="isento">
              Isento
            </WhiteFormLabel>
          </div>
          <div>
            <Checkbox
              onChange={() => setIsIptuExempt(false)}
              checked={!isIptuExempt}
              value="naoIsento"
            />
            <WhiteFormLabel component="label" htmlFor="naoIsento">
              Não Isento
            </WhiteFormLabel>
          </div>
          {!isIptuExempt && (
            <div>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Número de matrícula</WhiteFormLabel>
                <Input
                  type="text"
                  value={iptuValue}
                  onChange={handleIptuValueChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Valor Mensal </WhiteFormLabel>
                <Input
                  type="text"
                  value={iptuValue}
                  onChange={handleIptuValueChange}
                />
              </FormControl>
            </div>
          )}
        </FormControl>
      </DivContainer>
    </div>
  );
}

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

export default function TypeVenda() {
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
    <div>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda</WhiteFormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação(%)</WhiteFormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Condomínio:</WhiteFormLabel>
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
                <WhiteFormLabel>Nome Condomínio </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Nome Administradora </WhiteFormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Razão Social</WhiteFormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>CNPJ</WhiteFormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Site</WhiteFormLabel>
                <Input type="text" />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Login </WhiteFormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <WhiteFormLabel>Senha </WhiteFormLabel>
                <Input type="password" />
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
              <Input
                type="text"
                value={iptuValue}
                onChange={handleIptuValueChange}
                placeholder="Número de matrícula"
              />
              <Input
                type="text"
                value={iptuValue}
                onChange={handleIptuValueChange}
                placeholder="Valor Mensal"
              />
            </div>
          )}
        </FormControl>
      </DivContainer>
    </div>
  );
}

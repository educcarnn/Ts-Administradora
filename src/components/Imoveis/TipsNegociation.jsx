import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const TitleText = styled.div`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function TipsNegociation() {
  const [saleType, setSaleType] = useState("");
  const [isCondoExempt, setIsCondoExempt] = useState(false);
  const [condoValue, setCondoValue] = useState("");
  const [isIptuExempt, setIsIptuExempt] = useState(false);
  const [iptuValue, setIptuValue] = useState("");
  const [rentalModalities, setRentalModalities] = useState({
    seguroFianca: true,
  });

  const handleSaleTypeChange = (event) => {
    setSaleType(event.target.value);
  };

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
    <Container>
      <FormControl mt={3}>
        <TitleText>Tipo de Negociação</TitleText>
        <Select id="saleType" value={saleType} onChange={handleSaleTypeChange}>
          <option value="">Selecione</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
          <option value="venda_aluguel">Venda ou Aluguel</option>
        </Select>
      </FormControl>

      {saleType === "venda" && (
        <div>
          <FormControl mt={2}>
            <FormLabel>Valor da Venda</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Condomínio / Mês é isento?</FormLabel>
            <Checkbox onChange={handleCondoExemptChange}>
              Isento de Condomínio
            </Checkbox>
            {!isCondoExempt && (
              <Input
                type="text"
                value={condoValue}
                onChange={handleCondoValueChange}
                placeholder="Digite o valor do condomínio"
              />
            )}
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>IPTU / ANO é isento?</FormLabel>
            <Checkbox onChange={handleIptuExemptChange}>
              Isento de IPTU
            </Checkbox>
            {!isIptuExempt && (
              <Input
                type="text"
                value={iptuValue}
                onChange={handleIptuValueChange}
                placeholder="Digite o valor do IPTU"
              />
            )}
          </FormControl>
        </div>
      )}

      {saleType === "aluguel" && (
        <div>
          <FormControl mt={2}>
            <FormLabel>Valor do Aluguel</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Modalidade de Aluguel</FormLabel>
            <Checkbox
              name="seguroFianca"
              checked={rentalModalities.seguroFianca}
              onChange={handleRentalModalityChange}
            >
              Seguro Fiança
            </Checkbox>
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Condomínio / Mês é isento?</FormLabel>
            <Checkbox onChange={handleCondoExemptChange}>
              Isento de Condomínio
            </Checkbox>
            {!isCondoExempt && (
              <Input
                type="text"
                value={condoValue}
                onChange={handleCondoValueChange}
                placeholder="Digite o valor do condomínio"
              />
            )}
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>IPTU / ANO é isento?</FormLabel>
            <Checkbox onChange={handleIptuExemptChange}>
              Isento de IPTU
            </Checkbox>
            {!isIptuExempt && (
              <Input
                type="text"
                value={iptuValue}
                onChange={handleIptuValueChange}
                placeholder="Digite o valor do IPTU"
              />
            )}
          </FormControl>
        </div>
      )}

      {saleType === "venda_aluguel" && (
        <div>
          <FormControl mt={2}>
            <FormLabel>Valor da Venda</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Valor do Aluguel</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Modalidade de Aluguel</FormLabel>
            <Checkbox
              name="seguroFianca"
              checked={rentalModalities.seguroFianca}
              onChange={handleRentalModalityChange}
            >
              Seguro Fiança
            </Checkbox>
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>Condomínio / Mês é isento?</FormLabel>
            <Checkbox onChange={handleCondoExemptChange}>
              Isento de Condomínio
            </Checkbox>
            {!isCondoExempt && (
              <Input
                type="text"
                value={condoValue}
                onChange={handleCondoValueChange}
                placeholder="Digite o valor do condomínio"
              />
            )}
          </FormControl>

          <FormControl mt={2}>
            <FormLabel>IPTU / ANO é isento?</FormLabel>
            <Checkbox onChange={handleIptuExemptChange}>
              Isento de IPTU
            </Checkbox>
            {!isIptuExempt && (
              <Input
                type="text"
                value={iptuValue}
                onChange={handleIptuValueChange}
                placeholder="Digite o valor do IPTU"
              />
            )}
          </FormControl>
        </div>
      )}
    </Container>
  );
}
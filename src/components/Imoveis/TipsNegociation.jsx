import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";

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
    <div>
      <FormControl fullWidth margin="normal">
        <StyledTitleText variant="subtitle1">
          Tipo de Negociação
        </StyledTitleText>
        <Select id="saleType" value={saleType} onChange={handleSaleTypeChange}>
          <option value="">Selecione</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
          <option value="venda_aluguel">Venda ou Aluguel</option>
        </Select>
      </FormControl>

      {saleType === "venda" && (
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
                Isento de Condomínio
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsCondoExempt(false)}
                checked={!isCondoExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de Condomínio
              </WhiteFormLabel>
            </div>
            {!isCondoExempt && (
              <div>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Nome da Administradora do Condomínio</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Razão Social da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>CNPJ da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Site da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Senha da Administradora</WhiteFormLabel>
                  <Input type="password" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Valor Mensal do Condomínio</WhiteFormLabel>
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
                Isento de IPTU
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsIptuExempt(false)}
                checked={!isIptuExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de IPTU
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
      )}

      {saleType === "aluguel" && (
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
                Isento de Condomínio
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsCondoExempt(false)}
                checked={!isCondoExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de Condomínio
              </WhiteFormLabel>
            </div>
            {!isCondoExempt && (
              <div>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Nome da Administradora do Condomínio</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Razão Social da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>CNPJ da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Site da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Senha da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Valor Mensal do Condomínio</WhiteFormLabel>
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
                Isento de IPTU
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsIptuExempt(false)}
                checked={!isIptuExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de IPTU
              </WhiteFormLabel>
            </div>
            {!isIptuExempt && (
              <div>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Número de matrícula do IPTU</WhiteFormLabel>
                  <Input
                    type="text"
                    value={iptuValue}
                    onChange={handleIptuValueChange}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Valor Mensal do IPTU</WhiteFormLabel>
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
      )}

      {saleType === "venda_aluguel" && (
        <div>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel>Valor da Venda</WhiteFormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel>Taxa de Intermediação(%)</WhiteFormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel>Taxa de Administração(%)</WhiteFormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel>Taxa de Locação(%)</WhiteFormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
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
                Isento de Condomínio
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsCondoExempt(false)}
                checked={!isCondoExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de Condomínio
              </WhiteFormLabel>
            </div>
            {!isCondoExempt && (
              <div>
                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Nome da Administradora do Condomínio</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Razão Social da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>CNPJ da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Site da Administradora</WhiteFormLabel>
                  <Input type="text" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Senha da Administradora</WhiteFormLabel>
                  <Input type="password" />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <WhiteFormLabel>Valor Mensal do Condomínio</WhiteFormLabel>
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
                Isento de IPTU
              </WhiteFormLabel>
            </div>
            <div>
              <Checkbox
                onChange={() => setIsIptuExempt(false)}
                checked={!isIptuExempt}
                value="naoIsento"
              />
              <WhiteFormLabel component="label" htmlFor="naoIsento">
                Não Isento de IPTU
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
                  placeholder="Valor Mensaal"
                />
              </div>
            )}
          </FormControl>
        </div>
      )}
    </div>
  );
}

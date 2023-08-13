import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styled from "styled-components";
import TypeVenda from "./TipsNegociation/TypeVenda";
import TypeAluguel from "./TipsNegociation/TypeAluguel";
import TypeVendaeAluguel from "./TipsNegociation/TypeVendaeAluguel";
import { useNegociacao } from "../../context/NegociationProvider";

const DivContainer = styled.div`
  width: 50%;
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

export default function TipsNegociation() {
  const { saleType, handleSaleTypeChange } = useNegociacao();

  const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <StyledTitleText variant="subtitle1">
            Tipo de Negociação
          </StyledTitleText>
          <FormControlLabelGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={saleType.includes("venda")}
                  onChange={() => handleSaleTypeChange("venda")}
                />
              }
              label="Venda"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={saleType.includes("aluguel")}
                  onChange={() => handleSaleTypeChange("aluguel")}
                />
              }
              label="Aluguel"
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={saleType.includes("duasopcoes")}
                  onChange={() => handleSaleTypeChange("duasopcoes")}
                />
              }
              label="Venda e Aluguel"
              labelPlacement="end"
            />
          </FormControlLabelGroup>
        </FormControl>
      </DivContainer>
      {saleType.includes("venda") && <TypeVenda />}
      {saleType.includes("aluguel") && <TypeAluguel />}
      {saleType.includes("duasopcoes") && <TypeVendaeAluguel />}
    </CenterDiv>
  );
}

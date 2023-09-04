import React from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import styled from "styled-components";
import TypeVenda from "./TipsNegociation/TypeVenda";
import TypeAluguel from "./TipsNegociation/TypeAluguel";
import TypeVendaeAluguel from "./TipsNegociation/TypeVendaeAluguel";
import { useNegociacao } from "../../context/NegociationProvider";

const DivContainer = styled.div`
  width: 50%;
`;

const FormControlLabelGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

  const CenterDiv = styled.div`
 display: flex;
    flex-direction: column;
    align-items: center;
    color: "#FFFFFF";
    z-index: 1;
    justify-content: flex-start;
    align-content: space-around;
    align-items: stretch;
    flex-wrap: nowrap;
  `;
  
  
  const TextPage = styled.div`
   color: black;
   font-weight: bold;
   font-size: 1rem;
 `

export default function TipoNegociacao() {
  const { saleType, handleSaleTypeChange } = useNegociacao();



  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <TextPage>
            Tipo de Negociação
          </TextPage>
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

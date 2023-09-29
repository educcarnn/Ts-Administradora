import React from "react";
import { FormControl, FormLabel, Input, Checkbox } from "@material-ui/core";
import styled from "styled-components";
import { useFormularioContext } from "../../../../context/CadastroProvider";

const DivContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Venda() {
  const { register } = useFormularioContext();

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda R$</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao.valores.valorVenda")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação (%)</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao.valores.taxaIntermediacao")}
          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}

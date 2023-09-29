import React from "react";
import { FormControl, FormLabel, Input, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useFormularioContext } from "../../../../context/CadastroProvider";

// Estilização dos componentes
const DivContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;


export default function Aluguel() {
  const { register } = useFormularioContext();

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel R$</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao[valores][valorAluguel]")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Administração (%)</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao[valores][taxaAdministracao]")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Locação (%)</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao[valores][taxaLocacao]")}
          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}

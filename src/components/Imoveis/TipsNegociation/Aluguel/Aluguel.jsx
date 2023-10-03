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
            {...register("negociacao.valores.valorAluguel", {
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                const formattedValue = value.replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1."
                ); // Formata como 1.000.000,00
                e.target.value = formattedValue; // Atualiza o valor do campo de entrada
              },
            })}
            placeholder="0.00" // Opcional: define um placeholder para o formato esperado
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

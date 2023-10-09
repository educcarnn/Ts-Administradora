import React from "react";
import { FormControl, FormLabel, Input } from "@material-ui/core";
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

export default function VendaAluguel() {
  const { register } = useFormularioContext();

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda R$</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao.valores.vendaealuguelVenda", {
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, "");
                const formattedValue = value.replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1."
                );
                e.target.value = formattedValue; 
              },
            })}
            placeholder="0.00"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel R$</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao.valores.vendaealuguelAluguel", {
              onChange: (e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                const formattedValue = value.replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1."
                ); // Formata como 1.000.000,00
                e.target.value = formattedValue; // Atualiza o valor do campo de entrada
              },
            })}
            placeholder="0.00"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação (%)</WhiteFormLabel>
          <Input
            type="text"
            {...register("negociacao[valores][vendaealuguelTaxa]", {
              onChange: (e) => {
                let value = e.target.value.replace(",", ".");
                if (parseFloat(value) > 100) {
                  value = "100";
                }
                e.target.value = value;
              },
            })}
            placeholder="0.00%"
          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}

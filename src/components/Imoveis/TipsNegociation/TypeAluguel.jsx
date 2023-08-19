import React from 'react';
import { FormControl, FormLabel, Input, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useFormularioContext } from '../../../context/CadastroProvider';

const DivContainer = styled.div`
  width: 50%;
`;

const StyledTitleText = styled(Typography)`
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Movendo estilos para fora do componente
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteFormLabel = styled(FormLabel)`
  color: black;
`;

export default function TypeAluguel() {
  const { dadosFormulario, setDadosFormulario } = useFormularioContext();

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.valorAluguel}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    valorAluguel: e.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Administração (%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.taxaAdministracao}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    taxaAdministracao: e.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Locação (%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.taxaLocacao}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    taxaLocacao: e.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}

import React from 'react';
import { FormControl, FormLabel, Input } from '@material-ui/core';
import styled from 'styled-components';
import { useFormularioContext } from '../../../context/CadastroProvider';

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

export default function TypeVendaeAluguel() {
  const { dadosFormulario, setDadosFormulario  } = useFormularioContext();

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor da Venda</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.vendaealuguelVenda}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    vendaealuguelVenda: e.target.value,
                  },
                },
              })
            }
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.vendaealuguelAluguel}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    vendaealuguelAluguel: e.target.value,
                  },
                },
              })
            }
      
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Intermediação(%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.vendaealuguelTaxa}
            onChange={(e) =>
              setDadosFormulario({
                ...dadosFormulario,
                negociacao: {
                  ...dadosFormulario.negociacao,
                  valores: {
                    ...dadosFormulario.negociacao.valores,
                    vendaealuguelTaxa: e.target.value,
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

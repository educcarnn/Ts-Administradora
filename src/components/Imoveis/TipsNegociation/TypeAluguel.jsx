
import React from 'react';
import { FormControl, FormLabel, Input, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useFormularioContext } from '../../../context/CadastroProvider';

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

// Componente TypeAluguel
export default function TypeAluguel() {
  const { dadosFormulario, setDadosFormulario } = useFormularioContext();

  const handleValueChange = (field, value) => {
    setDadosFormulario({
      ...dadosFormulario,
      negociacao: {
        ...dadosFormulario.negociacao,
        valores: {
          ...dadosFormulario.negociacao.valores,
          [field]: value,
        },
      },
    });
  };

  return (
    <CenterDiv>
      <DivContainer>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Valor do Aluguel</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.valorAluguel}
            onChange={(e) => handleValueChange('valorAluguel', e.target.value)}
       
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Administração (%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.taxaAdministracao}
            onChange={(e) => handleValueChange('taxaAdministracao', e.target.value)}
        
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <WhiteFormLabel>Taxa de Locação (%)</WhiteFormLabel>
          <Input
            type="text"
            value={dadosFormulario.negociacao.valores.taxaLocacao}
            onChange={(e) => handleValueChange('taxaLocacao', e.target.value)}

          />
        </FormControl>
      </DivContainer>
    </CenterDiv>
  );
}

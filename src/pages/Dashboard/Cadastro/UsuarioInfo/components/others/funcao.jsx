import React from "react";
import { Checkbox, FormControlLabel, FormControl, FormGroup, Typography } from "@mui/material";

export default function Funcao({
  funcao,
  handleFuncaoChange, 
  isEditing,
}) {
  const todasOpcoesDisponiveis = ["Inquilino", "Proprietário", "Fiador"];

  const handleCheckboxChange = (funcaoSelecionada) => {
    if (!isEditing) {
      return; // Se estiver editando, permita a alteração
    }

    const funcoesSelecionadas = funcao.funcao || []; // Obtém as funções atuais
    const index = funcoesSelecionadas.indexOf(funcaoSelecionada);

    if (index !== -1) {

      funcoesSelecionadas.splice(index, 1);
    } else {
      // Caso contrário, adicione-a à lista
      funcoesSelecionadas.push(funcaoSelecionada);
    }

    // Chame a função handleFuncaoChange para atualizar o estado no componente pai
    handleFuncaoChange(funcoesSelecionadas, "funcao");
  };

  return (
    <>
      <FormControl component="fieldset">
        <strong>Função</strong>
        <FormGroup>
          {todasOpcoesDisponiveis.map((funcaoSelecionada) => (
            <FormControlLabel
              key={funcaoSelecionada}
              control={
                <Checkbox
                  name={funcaoSelecionada}
                  checked={funcao.funcao?.includes(funcaoSelecionada)}
                  disabled={!isEditing}
                  onChange={() => handleCheckboxChange(funcaoSelecionada)}
                />
              }
              label={funcaoSelecionada}
            />
          ))}
        </FormGroup>
      </FormControl>
    </>
  );
}

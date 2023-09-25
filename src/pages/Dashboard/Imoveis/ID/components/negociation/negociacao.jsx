import React from "react";
import {
  Input,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
} from "@mui/material";

export default function Negociacao({
  negociacao,
  handleInfoChange,
  
  tipo,
  isEditing,
  handleTipoNegociacao,
}) {
  const todasOpcoesDisponiveis = ["venda", "aluguel", "duasopcoes"];
  const camposDeVenda = ["Valor de Venda", "Taxa de Intermediação"];
  const camposDeAluguel = [
    "Valor de Aluguel",
    "Taxa de Administração",
    "Taxa de Locação",
  ];
  const camposDeVendaAluguel = [
    'Venda e Aluguel - Taxa',
    'Venda e Aluguel - Venda',
    'Venda e Aluguel - Compra'
  ];

  const handleChange = (campo, valor) => {
    if (handleInfoChange) {
      handleInfoChange(campo, valor);
    }
  };


  const handleTipoSelecionado = (caracteristica) => {
    console.log(negociacao)
    handleTipoNegociacao(caracteristica);
  };
  const renderCampos = () => {
    if (tipo.tipo === "venda") {
      return camposDeVenda.map((campo) => (
        <div key={campo}>
          <label>{campo}</label>
          <Input
            value={negociacao.valores[campo] || ""}
            onChange={(e) => handleChange(campo, e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ));
    } else if (tipo.tipo === "aluguel") {
      return camposDeAluguel.map((campo) => (
        <div key={campo}>
          <label>{campo}</label>
          <Input
            value={negociacao.valores[campo] || ""}
            onChange={(e) => handleChange(campo, e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ));
    } else if (tipo.tipo === "duasopcoes") {
      return camposDeVendaAluguel.map((campo) => (
        <div key={campo}>
          <label>{campo}</label>
          <Input
            value={negociacao.valores[campo] || ""}
            onChange={(e) => handleChange(campo, e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ));
    } else {
      // Se a opção for qualquer outra coisa, não mostrar campos
      return null;
    }
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormGroup>
          {todasOpcoesDisponiveis.map((caracteristica) => (
            <FormControlLabel
              key={caracteristica}
              control={
                <Checkbox
                  name={caracteristica}
                  checked={tipo.tipo === caracteristica}
                  disabled={!isEditing}
                  onChange={() => handleTipoSelecionado(caracteristica)} // Chame a função handleTipoSelecionado ao alterar a seleção
                />
              }
              label={caracteristica
                .split(/(?=[A-Z])/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            />
          ))}
        </FormGroup>
      </FormControl>
      {renderCampos()}
    </>
  );
}

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
  handleNegociacao, // Modificado para usar handleNegociacao
  tipo,
  isEditing,
  handleTipoNegociacao,
}) {
  const todasOpcoesDisponiveis = ["venda", "aluguel", "duasopcoes"];
  const camposDeVenda = {
    "Valor de Venda": "valorVenda",
    "Taxa de Intermediação": "taxaIntermediacao",
  };
  const camposDeAluguel = {
    "Valor de Aluguel": "valorAluguel",
    "Taxa de Administração": "taxaAdministracao",
    "Taxa de Locação": "taxaLocacao",
  };
  const camposDeVendaAluguel = {
    "Venda e Aluguel - Venda": "vendaealuguelVenda",
    "Venda e Aluguel - Aluguel": "vendaealuguelAluguel",
    "Venda e Aluguel - Taxa(%)": "vendaealuguelTaxa",
  };

  const handleChange = (campo, valor) => {
    handleNegociacao(campo, valor); // Chama a função handleNegociacao com os novos valores
  };

  const handleTipoSelecionado = (caracteristica) => {
    handleTipoNegociacao(caracteristica);
  };

  const renderCampos = () => {
    let campos = [];

    if (tipo.tipo === "venda") {
      campos = Object.keys(camposDeVenda);
    } else if (tipo.tipo === "aluguel") {
      campos = Object.keys(camposDeAluguel);
    } else if (tipo.tipo === "duasopcoes") {
      campos = Object.keys(camposDeVendaAluguel);
    }

    return campos.map((campo) => {
      if (tipo.tipo === "venda") {
        return (
          <div key={campo}>
            <label>{campo}</label>
            <Input
              value={negociacao.valores[camposDeVenda[campo]] || ""}
              onChange={(e) =>
                handleChange(camposDeVenda[campo] || campo, e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );
      } else if (tipo.tipo === "aluguel") {
        return (
          <div key={campo}>
            <label>{campo}</label>
            <Input
              value={negociacao.valores[camposDeAluguel[campo]] || ""}
              onChange={(e) =>
                handleChange(camposDeAluguel[campo] || campo, e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        );
      } else if (tipo.tipo === "duasopcoes") {
        return (
          <div key={campo}>
            <label>{campo}</label>
            <Input
              value={negociacao.valores[camposDeVendaAluguel[campo]] || ""}
              onChange={(e) =>
                handleChange(
                  camposDeVendaAluguel[campo] || campo,
                  e.target.value
                )
              }
              disabled={!isEditing}
            />
          </div>
        );
      }
      return null;
    });
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
                  onChange={() => handleTipoSelecionado(caracteristica)}
                />
              }
              label={
                caracteristica === "duasopcoes"
                  ? "Venda e Aluguel"
                  : caracteristica
                      .split(/(?=[A-Z])/)
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      {renderCampos()}
    </>
  );
}

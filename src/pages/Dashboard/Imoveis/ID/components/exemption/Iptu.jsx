import React, { useState } from "react";
import { ColumnContainer } from "../../../style";
import { Input, Typography, Checkbox } from "@mui/material";

export default function Iptu({ iptu, isEditing, handleInfoChange }) {
  const [naoIsento, setNaoIsento] = useState(iptu?.tipoIptu === "Não Isento"); // Definir o estado inicial com base no tipo de IPTU

  return (
    <>
      {/* Checkbox para "Isento" */}
      <Checkbox
        checked={!naoIsento} // Marcar como selecionado quando "Não Isento" não estiver selecionado
        onChange={() => {
          setNaoIsento(false);
          handleInfoChange("tipoIptu", "Isento"); // Modificar o tipoIptu para "Isento"
        }}
        disabled={!isEditing} // Desativar o checkbox se não estiver editando
      />
      <label>Isento</label>

      {/* Checkbox para "Não Isento" */}
      <Checkbox
        checked={naoIsento}
        onChange={() => {
          setNaoIsento(true);
          handleInfoChange("tipoIptu", "Não Isento"); // Modificar o tipoIptu para "Não Isento"
        }}
        disabled={!isEditing} // Desativar o checkbox se não estiver editando
      />
      <label>Não Isento</label>

      {naoIsento && (
        <div>
          <ColumnContainer>
            <label>Valor Mensal:</label>
            <Input
              type="text"
              value={iptu.iptu?.ValorMensal || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleInfoChange("ValorMensal", e.target.value)
              }
            />
          </ColumnContainer>
        </div>
      )}

      {naoIsento && (
        <div>
          <ColumnContainer>
            <label>Número de Matrícula IPTU:</label>
            <Input
              type="text"
              value={iptu.iptu?.NumerodeMatriculaIPTU || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleInfoChange("NumerodeMatriculaIPTU", e.target.value)
              }
            />
          </ColumnContainer>
        </div>
      )}
    </>
  );
}

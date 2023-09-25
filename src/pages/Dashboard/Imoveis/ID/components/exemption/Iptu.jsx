import React, { useState } from "react";
import { ColumnContainer } from "../../../style";
import { Input, Typography, Checkbox } from "@mui/material";

export default function Iptu({ tipoIptu, iptu, isEditing, handleIptuChange, handleTipoIptu }) {
  const [naoIsento, setNaoIsento] = useState(tipoIptu?.tipoIptu === "NaoIsento");

  const handleChangeTipoIptu = (novoTipo) => {
    setNaoIsento(novoTipo === "NaoIsento");
    handleTipoIptu(novoTipo); // Utilize a função handleTipoIptu para atualizar o tipo de IPTU
  };

  return (
    <>
      <Checkbox
        checked={!naoIsento}
        onChange={() => handleChangeTipoIptu("Isento")}
        disabled={!isEditing}
      />
      <label>Isento</label>

      <Checkbox
        checked={naoIsento}
        onChange={() => handleChangeTipoIptu("NaoIsento")}
        disabled={!isEditing}
      />
      <label>Não Isento</label>

      {naoIsento && (
        <div>
          <ColumnContainer>
            <label>Valor Mensal:</label>
            <Input
              type="text"
              value={iptu.iptu?.valorMensal || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleIptuChange("valorMensal", e.target.value)
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
              value={iptu.iptu?.numero_matricula_iptu || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleIptuChange("numero_matricula_iptu", e.target.value)
              }
            />
          </ColumnContainer>
        </div>
      )}
    </>
  );
}

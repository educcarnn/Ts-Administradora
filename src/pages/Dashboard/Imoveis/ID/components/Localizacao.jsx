import React from "react";
import { ColumnContainer } from "../../style";
import { Input } from "@mui/material";

export default function camposLocalizacao({ camposLocalizacao, isEditing, handleInfoChange, camposcamposLocalizacao }) {

  console.log(camposcamposLocalizacao)
  return (
    <>
      <ColumnContainer>
        <label>Bairro:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Bairro || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Bairro", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>CEP:</label>
        <Input
          type="text"
          value={camposLocalizacao?.CEP || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("CEP", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Cidade:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Cidade || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Cidade", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Complemento:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Complemento || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Complemento", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Endereço:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Endereço || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Endereço", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Estado:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Estado || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Estado", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Numero:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Numero || ""}
          disabled={!isEditing}
          onChange={e => handleInfoChange("Numero", e.target.value)}
        />
      </ColumnContainer>
    </>
  );
}

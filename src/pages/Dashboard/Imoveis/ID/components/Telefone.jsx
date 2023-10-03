import React from "react";
import { Typography, Input, Grid } from "@material-ui/core";

const TelefonesComponente = ({ telefone, isEditing, handleTelefoneChange }) => {
  const nomeAmigavelDosCampos = {
    telefone_celular: "Telefone Celular",
    telefone_fixo: "Telefone Fixo",
  };

  return (
    <>
      <div>
        <label>{nomeAmigavelDosCampos.telefone_celular}:</label>
        <Input
          type="text"
          value={telefone?.telefone_celular || ""}
          disabled={!isEditing}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remover não dígitos
            if (value.length <= 11) {
              e.target.value = value.replace(
                /(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
              );
              handleTelefoneChange("telefone_celular", e.target.value); // Adiciona a chamada para a função handleTelefoneChange
            }
          }}
          maxLength="14"
          onKeyPress={(event) => {
            if (event.which < 48 || event.which > 57) {
              event.preventDefault();
            }
          }}
        />
      </div>
      <div>
        <label>{nomeAmigavelDosCampos.telefone_fixo}:</label>
        <Input
          type="text"
          value={telefone?.telefone_fixo || ""}
          disabled={!isEditing}
          maxLength="14"
          onKeyPress={(event) => {
            if (event.which < 48 || event.which > 57) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            const value = event.target.value.replace(/\D/g, "");
            if (value.length === 10) {
              event.target.value = value.replace(
                /(\d{2})(\d{4})(\d{4})/,
                "($1) $2-$3"
              );
            }
            handleTelefoneChange("telefone_fixo", event.target.value);
          }}
        />
      </div>
    </>
  );
};

export default TelefonesComponente;

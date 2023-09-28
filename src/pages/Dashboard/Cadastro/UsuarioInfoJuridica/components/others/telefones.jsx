import React from "react";
import { Input, Typography } from "@mui/material";

const Telefones = ({ phoneData, handleTelefoneChange, isEditing }) => {
  return (
    <>
      <div>
        <strong>Telefone Fixo:</strong>
        {isEditing ? (
          <Input
            value={phoneData.telefoneFixo}
            onChange={(e) => handleTelefoneChange("telefoneFixo", e.target.value)}
          />
        ) : (
          <span>{phoneData.telefoneFixo}</span>
        )}
      </div>

      <div>
        <strong>Telefone Celular:</strong>
        {isEditing ? (
          <Input
            value={phoneData.telefoneCelular}
            onChange={(e) => handleTelefoneChange("telefoneCelular", e.target.value)}
          />
        ) : (
          <span>{phoneData.telefoneCelular}</span>
        )}
      </div>
    </>
  );
};

export default Telefones;

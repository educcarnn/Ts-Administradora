import React from "react";
import { Typography, Input } from "@mui/material";

const DadosCadastro = ({ info, isEditing, handleInfoChange }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dados de Cadastro
      </Typography>
      {Object.entries(info).map(([label, value]) => (
        <div key={label}>
          <strong>{label}:</strong>
          <Input
            value={value}
            onChange={(e) => handleInfoChange(label, e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ))}
    </>
  );
};

export default DadosCadastro;

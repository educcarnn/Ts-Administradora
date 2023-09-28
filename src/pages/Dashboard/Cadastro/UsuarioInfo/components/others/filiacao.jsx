import React from "react";
import { Input, Typography } from "@mui/material";

const Filiacao = ({ filiacaoData, isEditing, handleInfoChange }) => {
  return (
    <div>
      <div>
        <strong>Filiação (Mãe):</strong>
        <Input
          value={filiacaoData.mae}
          onChange={(e) => handleInfoChange("mae", e.target.value)} // Aqui foi alterado
          disabled={!isEditing}
        />
      </div>

      <div>
        <strong>Filiação (Pai):</strong>
        <Input
          value={filiacaoData.pai}
          onChange={(e) => handleInfoChange("pai", e.target.value)} // Aqui foi alterado
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default Filiacao;

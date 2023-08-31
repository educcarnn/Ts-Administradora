import React from "react";
import { Input, Typography} from "@mui/material";

const Filiacao = ({ filiacaoData, isEditing, handleInfoChange }) => {
  return (
    <>
      <Typography>Filiação (Mãe):</Typography>
      <Input
        value={filiacaoData.mae}
        onChange={(e) => handleInfoChange("mae", e.target.value)} // Aqui foi alterado
        disabled={!isEditing}
      />

      <Typography>Filiação (Pai):</Typography>
      <Input
        value={filiacaoData.pai}
        onChange={(e) => handleInfoChange("pai", e.target.value)} // Aqui foi alterado
        disabled={!isEditing}
      />
    </>
  );
};

export default Filiacao;

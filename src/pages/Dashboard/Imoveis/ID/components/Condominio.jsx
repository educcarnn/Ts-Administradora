import React from "react";

import { Input, Typography } from "@mui/material";
import { ColumnContainer } from "../../style";

const CondominioComponente = ({ data, isEditing, handleInfoChange }) => {
  console.log(data.TipoCondominio);
  console.log(data);
  return (
    <>
      {data.TipoCondominio === "Isento" ? (
        <div>
 
          <span>Isento</span>
        </div>
      ) : (
        Object.entries(data.condominio).map(([campo, valor]) => (
          <div key={campo}>
            <ColumnContainer>
              <label>{campo}:</label>
              <Input
                type="text"
                value={valor || ""}
                disabled={!isEditing}
                onChange={(e) => handleInfoChange(campo, e.target.value)}
              />
            </ColumnContainer>
          </div>
        ))
      )}
    </>
  );
};

export default CondominioComponente;

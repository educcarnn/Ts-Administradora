import React from "react";
import { ColumnContainer } from "../../style";
import { Input } from "@mui/material";

export default function CaracteristicasConstrucao({ data, isEditing, handleInputChange }) {
  return (
    <>
      {Object.entries(data).map(([campo, valor]) => (
        <div key={campo}>
          <ColumnContainer>
            <label>{campo}:</label>
            <Input 
              type="text" 
              value={valor || ""} 
              readOnly={!isEditing}
              onChange={(event) => handleInputChange(campo, event)}
            />
          </ColumnContainer>
        </div>
      ))}
    </>
  );
}

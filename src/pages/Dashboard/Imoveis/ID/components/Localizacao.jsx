import React from "react";
import { ColumnContainer } from "../../style";
import { Input } from "@mui/material";

export default function Localizacao({ data, isEditing, handleInfoChange }) {

  return (
    <>
      {Object.entries(data).map(([campo, valor]) => (
        <div key={campo}>
          <ColumnContainer>
            <label>{campo}:</label>
            <Input 
              type="text" 
              value={valor || ""} 
              disabled={!isEditing}
              onChange={e => handleInfoChange(campo, e.target.value)}
            />
          </ColumnContainer>
        </div>
      ))}
    </>
  );
}

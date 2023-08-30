import React from "react";
import { ColumnContainer } from "../../style";
import { Input } from "@mui/material";

export default function Localizacao({ data, isEditing, handleInputChange }) {

    console.log(isEditing)

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
                onChange={e => handleInputChange(campo, e)}
              />
            </ColumnContainer>
          </div>
        ))}
      </>
    );
  }

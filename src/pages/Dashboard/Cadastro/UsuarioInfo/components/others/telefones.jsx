import React from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input } from "@material-ui/core";

const Telefones = ({ phoneData, isEditing, handleTelefoneChange }) => {
  return (
    <>
      {Object.entries(phoneData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong>
          <Input
            value={value}
            onChange={(e) => handleTelefoneChange(key, e.target.value)}
            disabled={!isEditing}
          />
        </div>
      ))}
    </>
  );
};

export default Telefones;

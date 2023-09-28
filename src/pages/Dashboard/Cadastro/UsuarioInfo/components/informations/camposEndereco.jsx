import React from 'react';
import { Input, Typography } from '@material-ui/core';

const Endereco = ({ addressData, handleInfoChange, isEditing }) => {

   
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Endereço
      </Typography>
      {Object.entries(addressData).map(([chave, valor]) => (
        <div key={chave}>
          <strong>{chave}:</strong> 
          {isEditing ? (
            <Input 
              value={valor}
              onChange={(e) => handleInfoChange(chave, e.target.value)}
            />
          ) : (
            <span>{valor}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Endereco;

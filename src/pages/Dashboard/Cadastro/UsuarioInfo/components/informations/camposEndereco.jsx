import React from 'react';
import { Input, Typography } from '@mui/material';

const Endereco = ({ addressData, handleInfoChange, isEditing }) => {

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Endereço
      </Typography>
      <div>
        <strong>CEP:</strong> 
        {isEditing ? (
          <Input 
            value={addressData.cep}
            onChange={(e) => handleInfoChange('cep', e.target.value)}
          />
        ) : (
          <span>{addressData.cep}</span>
        )}
      </div>

      <div>
        <strong>Bairro:</strong> 
        {isEditing ? (
          <Input 
            value={addressData.bairro}
            onChange={(e) => handleInfoChange('bairro', e.target.value)}
          />
        ) : (
          <span>{addressData.bairro}</span>
        )}
      </div>

      <div>
        <strong>Cidade:</strong> 
        {isEditing ? (
          <Input 
            value={addressData.cidade}
            onChange={(e) => handleInfoChange('cidade', e.target.value)}
          />
        ) : (
          <span>{addressData.cidade}</span>
        )}
      </div>

      <div>
        <strong>Endereço:</strong> 
        {isEditing ? (
          <Input 
            value={addressData.endereco}
            onChange={(e) => handleInfoChange('endereco', e.target.value)}
          />
        ) : (
          <span>{addressData.endereco}</span>
        )}
      </div>

      <div>
        <strong>Estado:</strong> 
        {isEditing ? (
          <Input 
            value={addressData.estado}
            onChange={(e) => handleInfoChange('estado', e.target.value)}
          />
        ) : (
          <span>{addressData.estado}</span>
        )}
      </div>
    </div>
  );
};

export default Endereco;

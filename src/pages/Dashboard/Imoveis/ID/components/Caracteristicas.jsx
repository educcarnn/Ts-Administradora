import React from 'react';
import { Typography, List, ListItem, Box } from '@material-ui/core';

function Caracteristicas({ caracteristicasCondominio, caracteristicasImovel }) {
  return (
    <div>
      <Box marginTop={2}>
        <Typography variant="h6">Características do Condomínio:</Typography>
        <List>
          {caracteristicasCondominio.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Box>

      <Box marginTop={2}>
        <Typography variant="h6">Características do Imóvel:</Typography>
        <List>
          {caracteristicasImovel.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default Caracteristicas;

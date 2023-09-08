import React from 'react';
import { Typography, Input, Grid } from '@material-ui/core';

const TelefonesComponente = ({ data, isEditing, handleInfoChange }) => {

  return (
    <div>
      <Typography variant="h6">Telefones</Typography>
      {Object.entries(data).map(([campo, valor]) => (
        <Grid container key={campo} spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography>{campo}:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Input
        
              value={valor || ""}
              disabled={!isEditing}
              onChange={e => handleInfoChange(campo, e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default TelefonesComponente;

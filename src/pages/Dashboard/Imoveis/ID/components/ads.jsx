import React from "react";
import { TextField, Grid, Typography } from "@material-ui/core";

function Anuncio({ anuncios, isEditing, handleInfoChangeAds }) {

  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs={12}>
        <Typography variant="h6">Título do Anúncio:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={anuncios.Título}
          onChange={(e) => handleInfoChangeAds("Título", e.target.value)}
          disabled={!isEditing}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Descrição do Anúncio:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={anuncios.Descrição}
          onChange={(e) => handleInfoChangeAds("Descrição", e.target.value)}
          disabled={!isEditing}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Contrato de prestação de serviço:</Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={anuncios.Contrato}
          onChange={(e) => handleInfoChangeAds("Contrato", e.target.value)}
          disabled={!isEditing}
        />
      </Grid>
    </Grid>
  );
}

export default Anuncio;

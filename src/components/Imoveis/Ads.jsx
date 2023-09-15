import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  FormControl,
  FormGroup,
  TextField,
  Box,
} from "@material-ui/core";

function AnuncioForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Título:", title);
    console.log("Descrição:", description);
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">Título do Anúncio</Typography>
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    fontSize: 24, // Aumente o tamanho da fonte
                    width: "100%",
                    height: 100, // Aumente a altura do campo
                  }}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">Descrição do Anúncio</Typography>
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{
                    style: {
                      fontSize: 12, // Aumente o tamanho da fonte
                      minHeight: 200, // Aumente a altura mínima
                    },
                  }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AnuncioForm;

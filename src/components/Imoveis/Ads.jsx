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
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={10}>
            {" "}
            {/* Alterado de sm={8} para sm={10} */}
            <Typography variant="h6">Título do Anúncio</Typography>
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    marginTop: 10,
                    fontSize: 18,
                    width: "100%",
                    height: 70,
                  }}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={10}>
            {" "}
            {/* Alterado de sm={8} para sm={10} */}
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
                  style={{ marginTop: 10, fontSize: 18, width: "100%" }}
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

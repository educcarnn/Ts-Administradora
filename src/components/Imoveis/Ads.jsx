import React, { useContext } from "react";
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


import { useFormularioContext } from "../../context/CadastroProvider";

function AnuncioForm() {

  const { dadosFormulario, setDadosFormulario } = useFormularioContext();

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      anuncio: {
        ...prevData.anuncio,
        title: newTitle,
      },
    }));
  };
  

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      anuncio: {
        ...prevData.anuncio,
        description: newDescription,
      },
    }));
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
                  // Preencha o campo com o valor do contexto
                  value={dadosFormulario.anuncio.title}
                  // Use o manipulador para atualizar o contexto
                  onChange={handleTitleChange}
                  style={{
                    fontSize: 24,
                    width: "100%",
                    height: 100,
                  }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">Contrato de prestação de serviço</Typography>
            <FormControl component="fieldset" fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  // Preencha o campo com o valor do contexto
                  value={dadosFormulario.anuncio.title}
                  // Use o manipulador para atualizar o contexto
                  onChange={handleTitleChange}
                  style={{
                    fontSize: 24,
                    width: "100%",
                    height: 100,
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
                  // Preencha o campo com o valor do contexto
                  value={dadosFormulario.anuncio.description}
                  // Use o manipulador para atualizar o contexto
                  onChange={handleDescriptionChange}
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

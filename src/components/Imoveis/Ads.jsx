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
  FormHelperText,
} from "@material-ui/core";

import { useFormularioContext } from "../../context/CadastroProvider";

function AnuncioForm() {
  const { register, errors } = useFormularioContext();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">Título do Anúncio</Typography>
            <FormControl fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  {...register("anuncio.title", { required: true })}
                  error={Boolean(errors.title)}
                  style={{
                    fontSize: 24,
                    width: "100%",
                    height: 100,
                  }}
                />
              </FormGroup>
            </FormControl>
            <FormHelperText error={Boolean(errors.title)}>
              {errors.title ? "Preencha este campo" : ""}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">
              Contrato de prestação de serviço
            </Typography>
            <FormControl fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  {...register("anuncio.contrato", { required: true })}
                  error={Boolean(errors["anuncio.contrato"])}
                  style={{
                    fontSize: 24,
                    width: "100%",
                    height: 100,
                  }}
                />
                {errors["anuncio.contrato"] && (
                  <div style={{ color: "red" }}>Preencha este campo</div>
                )}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={10} style={{ marginTop: 0 }}>
            <Typography variant="h6">Descrição do Anúncio</Typography>
            <FormControl fullWidth>
              <FormGroup>
                <TextField
                  fullWidth
                  multiline
                  required
                  rows={6}
                  variant="outlined"
                  {...register("anuncio.description", { required: true })} // Define a regra de validação "required"
                  error={Boolean(errors["anuncio.description"])}
                  inputProps={{
                    style: {
                      fontSize: 12,
                      minHeight: 200,
                    },
                  }}
                />
                {errors["anuncio.description"] && (
                  <div style={{ color: "red" }}>Preencha este campo</div>
                )}
              </FormGroup>
            </FormControl>
          </Grid>
          
        </Grid>
      </Box>
    </Container>
  );
}

export default AnuncioForm;

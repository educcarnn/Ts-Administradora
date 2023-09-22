import React from "react";

import {
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel
} from "@material-ui/core";
import { useFormularioContext } from "../../context/CadastroProvider";

const PropertyForm = () => {
  const { register } = useFormularioContext();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Características da Construção</Typography>
          <FormControl fullWidth>
          <InputLabel>Tipo de Construção</InputLabel>
            <Select {...register("caracteristicas.tipoConstrucao")} required>
              <MenuItem value="">Selecione</MenuItem>
              <MenuItem value="Padrão">Padrão</MenuItem>
              <MenuItem value="Duplex">Duplex</MenuItem>
              <MenuItem value="Triplex">Triplex</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Número de Quartos</FormLabel>
            <TextField
              required
              type="text"
              {...register("caracteristicas.numeroQuartos")}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Sendo Suítes</FormLabel>
            <TextField
              required
              type="text"
              {...register("caracteristicas.numeroSuites")}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Número de Banheiros</FormLabel>

            <TextField
              required
              type="text"
              {...register("caracteristicas.numeroBanheiros")}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Número de Vagas</FormLabel>
            <TextField
              type="text"
              {...register("caracteristicas.numeroVagas")}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Área Útil (m²)</FormLabel>
            <TextField
              type="text"
              {...register("caracteristicas.areaUtil")}
              required
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FormLabel>Área Total (m²)</FormLabel>
            <TextField
              type="text"
              {...register("caracteristicas.areaTotal")}
              required
            />
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyForm;

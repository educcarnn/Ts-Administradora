import React, { useState } from "react";
import { FormControl, Typography, Select, MenuItem, InputLabel } from "@material-ui/core";
import CaracteresFields from "../../../components/Imoveis/CaracteresFields";
import { makeStyles } from "@material-ui/core/styles";
import { useFormularioContext } from "../../../context/CadastroProvider";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
}));

export default function ComercialForm() {
  const classes = useStyles();
  const { register } = useFormularioContext();



  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Imóvel Comercial
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Tipo de Imóvel</InputLabel>
        <Select {...register("generoImovel")} required>
          <MenuItem value="">Selecione</MenuItem>
          <MenuItem value="Lote">Lote</MenuItem>
          <MenuItem value="Sala">Sala</MenuItem>
          <MenuItem value="Loja">Loja</MenuItem>
          <MenuItem value="Casa Comercial">Casa Comercial</MenuItem>
          <MenuItem value="Galpao">Galpão</MenuItem>
        </Select>
      </FormControl>
      <CaracteresFields />
    </>
  );
}

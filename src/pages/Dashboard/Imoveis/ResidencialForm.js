import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
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

export default function ResidencialForm() {
  const classes = useStyles();
  const { register, getValues } = useFormularioContext();
  const [buildingType, setBuildingType] = useState("");

  const handleBuildingTypeChange = (event) => {
    const currentValue = event.target.value;
    setBuildingType(currentValue);
    register("generoImovel").onChange(event); // Isso atualizará o valor no contexto do formulário.
  };

  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Imóvel Residencial
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Tipo de Imóvel</InputLabel>
        <Select {...register("generoImovel")} required>
          <MenuItem value="">Selecione</MenuItem>
          <MenuItem value="casa">Casa</MenuItem>
          <MenuItem value="apartamento">Apartamento</MenuItem>
          <MenuItem value="cobertura">Cobertura</MenuItem>
          <MenuItem value="kitnet">Kitnet</MenuItem>
        </Select>
      </FormControl>
      <CaracteresFields />
    </>
  );
}

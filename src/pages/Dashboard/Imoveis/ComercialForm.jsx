import React, { useState } from "react";
import { FormControl, Typography, Select, MenuItem } from "@material-ui/core";
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
  const { dadosFormulario, setDadosFormulario } = useFormularioContext();
  const [propertyType, setPropertyType] = useState("");

  const handlePropertyTypeChange = (event) => {
    const selectedPropertyType = event.target.value;

    setPropertyType(selectedPropertyType);

    setDadosFormulario((prevData) => ({
      ...prevData,
      generoImovel: selectedPropertyType,
    }));
  };

  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Imóvel Comercial
      </Typography>
      <FormControl className={classes.formControl}>
        <Select value={propertyType} onChange={handlePropertyTypeChange}>
          <MenuItem value="">
            <em>Selecione</em>
          </MenuItem>
          <MenuItem value="lote">Lote</MenuItem>
          <MenuItem value="sala">Sala</MenuItem>
          <MenuItem value="loja">Loja</MenuItem>
          <MenuItem value="casa_comercial">Casa Comercial</MenuItem>
          <MenuItem value="galpao">Galpão</MenuItem>
        </Select>
      </FormControl>
      <CaracteresFields />
    </>
  );
}

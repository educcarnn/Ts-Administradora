import React, { useState } from "react";
import { FormControl, Typography, Select, MenuItem } from "@material-ui/core";
import CaracteresFields from "../../../components/Imoveis/CaracteresFields";
import { makeStyles } from "@material-ui/core/styles";

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
  const [propertyType, setPropertyType] = useState("");

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
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
          <MenuItem value="lote_terreno">Lote</MenuItem>
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

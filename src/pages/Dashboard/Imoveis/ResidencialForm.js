import React, { useState } from 'react';
import {
  FormControl,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import CaracteresFields from '../../../components/Imoveis/CaracteresFields';
import { makeStyles } from '@material-ui/core/styles';
import { useFormularioContext } from '../../../context/CadastroProvider'; // Importar o contexto aqui

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
  const { dadosFormulario, setDadosFormulario } = useFormularioContext(); // Usar o contexto aqui
  const [buildingType, setBuildingType] = useState('');

  const handleBuildingTypeChange = (event) => {
    const selectedBuildingType = event.target.value;

    setBuildingType(selectedBuildingType);

    // Modificar apenas o campo "generoImovel" no contexto
    setDadosFormulario((prevData) => ({
      ...prevData,
      generoImovel: selectedBuildingType,
    }));

    // Colocar o console.log aqui para acompanhar as mudanças no contexto
    console.log("Dados do formulário no contexto:", dadosFormulario);
  };

  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Imóvel Residencial
      </Typography>
      <FormControl className={classes.formControl}>
      <Select
          value={buildingType}
          onChange={handleBuildingTypeChange}
        >

          <MenuItem value="">
            <em>Selecione</em>
          </MenuItem>
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

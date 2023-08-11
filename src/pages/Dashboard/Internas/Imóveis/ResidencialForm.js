import React, { useState } from 'react';
import {
  FormControl,
  Typography,
  Select,
  MenuItem
} from '@material-ui/core';
import CaracteresFields from '../../../../components/Imoveis/CaracteresFields';
import { makeStyles } from '@material-ui/core/styles';

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
  const [buildingType, setBuildingType] = useState('');

  const handleBuildingTypeChange = (event) => {
    setBuildingType(event.target.value);
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
          <MenuItem value="padrao">Casa</MenuItem>
          <MenuItem value="duplex">Apartamento</MenuItem>
          <MenuItem value="triplex">Cobertura</MenuItem>
          <MenuItem value="kitnet">Kitnet</MenuItem>
        </Select>
      </FormControl>
      <CaracteresFields />
    </>
  );
}
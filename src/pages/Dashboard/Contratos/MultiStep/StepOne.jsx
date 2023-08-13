import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const StepOne = () => {
  const classes = useStyles();
  const { activeStep, steps } = useMultiStepContext();

  return (
    <div>
      <TextField label="Proprietário" fullWidth />

      <FormControl className={classes.formControl}>
        <InputLabel>Tipo de Contrato</InputLabel>
        <Select>
          <MenuItem value="residencial">Residencial</MenuItem>
          <MenuItem value="nao-residencial">Não-Residencial</MenuItem>
          <MenuItem value="temporada">Temporada</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default StepOne;

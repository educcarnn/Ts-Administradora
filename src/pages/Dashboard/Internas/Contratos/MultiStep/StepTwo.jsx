import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const StepTwo = () => {
  const classes = useStyles();
  const { activeStep, steps } = useMultiStepContext();

  return (
    <div>
      <InputLabel>Tributação</InputLabel>
      <TextField label="Locatários" fullWidth />
      <FormControl className={classes.formControl}>
        <label>Nota Fiscal</label>
        <Select>
          <MenuItem value="nova-fiscal">Emitir pelo sistema</MenuItem>
          <MenuItem value="imposto-renda">Não emitir pelo sistema</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <label>Endereço de cobrança</label>
        <Select>
          <MenuItem value="nova-fiscal">Usar endereço do locatário</MenuItem>
          <MenuItem value="imposto-renda">
            Usar endereço do imóvel locado
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default StepTwo;

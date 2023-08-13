import React from "react";
import {
  FormControl,
  FormLabel,
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

const StepThree = () => {
  const classes = useStyles();
  const { activeStep } = useMultiStepContext();


  if (activeStep !== 2) {
    return null;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <FormLabel>Qual garantia utilizada?</FormLabel>
        <Select>
          <MenuItem value="deposito">Depósito</MenuItem>
          <MenuItem value="fiador">Fiador</MenuItem>
          <MenuItem value="segurofianca">Seguro Fiança</MenuItem>
          <MenuItem value="semgarantia">Sem garantia</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default StepThree;

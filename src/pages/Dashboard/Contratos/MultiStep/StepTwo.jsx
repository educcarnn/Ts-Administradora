import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    width: "50%",
    height: "50%"
  }
}));

const StepTwo = () => {
  const classes = useStyles();
  const { activeStep } = useMultiStepContext();

  return (
    <Container className={classes.container}>

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
    </Container>
  );
};

export default StepTwo;

import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  resize: {
    resize: "none",
    maxWidth: "80%",
  },
  contentRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newText: {
    display: "flex",
    flexDirection: "row"
  }
}));

const StepOne = () => {
  const classes = useStyles();
  const { activeStep, steps } = useMultiStepContext();

  return (
    <div>
      <div className={classes.contentRow}>
        <div className={classes.newText}>
          <TextField label="Imóvel" fullWidth />

          <Button variant="contained" color="primary">
            Novo
          </Button>
        </div>

        <TextField label="Proprietário" fullWidth />
      </div>

      <FormControl className={classes.resize}>
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

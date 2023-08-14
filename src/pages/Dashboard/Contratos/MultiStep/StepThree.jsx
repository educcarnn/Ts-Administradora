import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputField: {
    margin: theme.spacing(1),
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
}));

const StepThree = () => {
  const classes = useStyles();
  const { activeStep } = useMultiStepContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [showFields, setShowFields] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowFields(true);
  };

  if (activeStep !== 2) {
    return null;
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <FormLabel>Qual garantia utilizada?</FormLabel>
        <Select value={selectedOption} onChange={handleOptionChange}>
          <MenuItem value="deposito">Depósito</MenuItem>
          <MenuItem value="fiador">Fiador</MenuItem>
          <MenuItem value="segurofianca">Seguro Fiança</MenuItem>
          <MenuItem value="semgarantia">Sem garantia</MenuItem>
        </Select>
      </FormControl>

      {showFields && (
        <div>
          {selectedOption === "fiador" && (
            <FormControl className={classes.inputField}>
              <FormLabel>Selecionar fiador</FormLabel>
              <Select placeholder="Selecionar fiador">
            
                <MenuItem value={1}>Banco de dados</MenuItem>
            
              </Select>
              <Button
                variant="contained"
                color="primary"
                className={classes.addButton}
              >
                Adicionar
              </Button>
            </FormControl>
          )}

          {selectedOption === "segurofianca" && (
            <div>
              <TextField
                label="Data de início"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inputField}
              />
              <TextField
                label="Data de término"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inputField}
              />
              <TextField
                label="Valor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                className={classes.inputField}
              />
               <Box className={classes.rowContainer}>
                <TextField
                  label="Seguradora"
                  className={classes.inputField}
                />
                <Button variant="contained" color="primary">
                  Adicionar
                </Button>
              </Box>

              <TextField
                label="Apólice"
                className={classes.inputField}
              />
              <TextField
                label="Número de parcelas"
                className={classes.inputField}
              />
              <TextField
                label="Observação"
                multiline
                rows={4}
                className={classes.inputField}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepThree;

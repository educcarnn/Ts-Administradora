import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  InputAdornment,
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
}));

const StepThree = () => {
  const classes = useStyles();
  const { activeStep, setDadosFormulario, dadosFormulario } =
    useMultiStepContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [showFields, setShowFields] = useState(false);

  const handleOptionChange = (event) => {
    const newHandleOptions = event.target.value;
    setSelectedOption(newHandleOptions);

    setDadosFormulario((prevData) => ({
      ...prevData,
      garantia: {
        ...prevData.garantia,
        tipo: event.target.value.toLowerCase(),
      },
    }));

    setShowFields(true);
  };

  const handleDataTerminoChange = (event) => {
    const newDateTermino = event.target.value;

    // Ensure that the new date is not earlier than the data de início
    if (newDateTermino >= dadosFormulario.garantia.dataInicio) {
      setDadosFormulario((prevData) => ({
        ...prevData,
        garantia: {
          ...prevData.garantia,
          dataTermino: newDateTermino,
        },
      }));
    } else {
      // You might want to show an error message or take other actions
      console.error("Data de término não pode ser menor que a data de início.");
    }
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
          <MenuItem value="segurofianca">Seguro Fiança</MenuItem>
          <MenuItem value="sem-garantia">Sem garantia</MenuItem>
        </Select>
      </FormControl>

      {showFields && (
        <div>
          {selectedOption === "segurofianca" && (
            <div>
              <TextField
                label="Data de início"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inputField}
                value={dadosFormulario.garantia.dataInicio}
                onChange={(event) =>
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    garantia: {
                      ...prevData.garantia,
                      dataInicio: event.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Data de término"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.inputField}
                value={dadosFormulario.garantia.dataTermino}
                onChange={handleDataTerminoChange}
              />
              <TextField
                label="Valor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                className={classes.inputField}
                onChange={(event) =>
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    garantia: {
                      ...prevData.garantia,
                      valor: event.target.value,
                    },
                  }))
                }
              />
              <Box className={classes.rowContainer}>
                <TextField
                  label="Seguradora"
                  className={classes.inputField}
                />
              </Box>
              <TextField
                label="Apólice"
                className={classes.inputField}
              />
              <TextField
                label="Número de parcelas"
                className={classes.inputField}
                onChange={(event) =>
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    garantia: {
                      ...prevData.garantia,
                      numeroParcelas: event.target.value,
                    },
                  }))
                }
              />
              <TextField
                label="Observação"
                multiline
                rows={4}
                className={classes.inputField}
                onChange={(event) =>
                  setDadosFormulario((prevData) => ({
                    ...prevData,
                    garantia: {
                      ...prevData.garantia,
                      observacao: event.target.value,
                    },
                  }))
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepThree;

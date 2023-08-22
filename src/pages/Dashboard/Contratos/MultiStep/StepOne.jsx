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
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  resize: {
    resize: "none",
    width: "100%",
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
  const { activeStep, steps, setDadosFormulario, dadosFormulario} = useMultiStepContext();
  const [contractData, setContractData] = useState()

  const handleContrato = (event) => {
    const newContract = event.target.value;
    setContractData(newContract)
  


    setDadosFormulario((prevData) => ({
      ...prevData,
      tipoContrato: newContract,
    }));

    console.log("Dados do formulário no contexto:", dadosFormulario);
  };

  return (
    <div>
      <div className={classes.contentRow}>
        <div className={classes.newText}>
          
          <TextField label="Imóvel" fullWidth />

{/*          <Button variant="contained" color="primary">
            Novo
  </Button>*/}
        </div>

        <TextField label="Proprietário" fullWidth />
      </div>

      <FormControl className={classes.resize}>
        <InputLabel>Tipo de Contrato</InputLabel>
        <Select onChange={handleContrato}>
          <MenuItem value="residencial">Residencial</MenuItem>
          <MenuItem value="nao-residencial">Não-Residencial</MenuItem>
          <MenuItem value="temporada">Temporada</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default StepOne;

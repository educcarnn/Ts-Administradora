import React from "react";
import { FormControl, FormLabel, Select, MenuItem, TextField, InputAdornment, Container, Typography, Divider, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const StepFour = () => {
  const classes = useStyles();
  const { activeStep } = useMultiStepContext();

  // Renderizar conteúdo apenas na quarta etapa
  if (activeStep !== 3) {
    return null;
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h5">4ª Etapa - Detalhes do Contrato</Typography>
      <Divider className={classes.divider} />

      {/* Input de valor em R$ */}
      <TextField
        className={classes.input}
        label="Valor em R$"
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />

      {/* Label e Select para Reajuste */}
      <FormControl className={classes.formControl}>
        <FormLabel>Reajuste</FormLabel>
        <Select>
          <MenuItem value="inpc">INPC</MenuItem>
          <MenuItem value="igpm">IGPM</MenuItem>
          <MenuItem value="ipca">IPCA</MenuItem>
        </Select>
      </FormControl>

      {/* Div de Informações de Contrato */}
      <div>
        <Typography variant="subtitle1">Informações de Contrato</Typography>
        <TextField label="Início" type="date" className={classes.input} InputLabelProps={{ shrink: true }} />
        <TextField label="Duração (em meses)" type="number" className={classes.input} InputProps={{ inputProps: { min: 1 } }} />
        <TextField label="Fim" type="date" className={classes.input} InputLabelProps={{ shrink: true }} />
        <TextField label="Valor de Aluguel" className={classes.input} InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
        <TextField label="Dia de Vencimento" type="number" className={classes.input} InputProps={{ inputProps: { min: 1, max: 31 } }} />
        <TextField label="Ocupação" type="date" className={classes.input} InputLabelProps={{ shrink: true }} />
      </div>

      {/* Opções Adicionais */}
      <div>
        <Typography variant="subtitle1">Opções Adicionais</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Cobrança Tarifa Bancária (Locatário)" />
          <FormControlLabel control={<Checkbox />} label="Cobrança Tarifa Bancária (Proprietário)" />
          <TextField label="Taxa Percentual (%)" type="number" className={classes.input} InputProps={{ inputProps: { min: 0, max: 100, step: 0.01 } }} />
        </FormGroup>
      </div>
    </Container>
  );
};

export default StepFour;

import React from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Container,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    width: "75%",
    flexDirection: "column",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  adjustDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  input: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  textBold: {
    fontWeight: "bold",
  },
  "@media (max-width: 800px)": {
    container: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
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
      <Divider className={classes.divider} />
      <div className={classes.adjustDate}>
        <TextField
          className={classes.input}
          label="Valor em R$"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />

        <FormControl className={classes.formControl}>
          <FormLabel>Reajuste</FormLabel>
          <Select>
            <MenuItem value="inpc">INPC</MenuItem>
            <MenuItem value="igpm">IGPM</MenuItem>
            <MenuItem value="ipca">IPCA</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.textBold}>
          Informações de Contrato
        </Typography>
        <div>
          <TextField
            label="Início"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Duração (em meses)"
            type="number"
            className={classes.input}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <TextField
            label="Fim"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div>
          <TextField
            label="Valor de Aluguel"
            className={classes.input}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Dia de Vencimento"
            type="number"
            className={classes.input}
          />
          <TextField
            label="Ocupação"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>

      <div>
        <Typography className={classes.textBold} variant="subtitle1">
          Mais opções
        </Typography>
        <FormGroup>
        <FormLabel>Cobrança Tarifa Bancária</FormLabel>
          <FormControlLabel
            control={<Checkbox />}
            label="Locatário"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Proprietário"
          />
          <TextField
            label="Taxa Percentual (%)"
            type="number"
            className={classes.input}
            InputProps={{ inputProps: { min: 0, max: 100, step: 0.01 } }}
          />
        </FormGroup>
      </div>
    </Container>
  );
};

export default StepFour;

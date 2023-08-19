import React from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMultiStepContext } from '../../../../context/MultiStepProvider';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '75%',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  adjustDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  textBold: {
    fontWeight: 'bold',
  },
  '@media (max-width: 800px)': {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
}));

const StepFour = () => {
  const classes = useStyles();
  const handleCobrancaChange = event => {
    const selectedOption = event.target.value;
    setDadosFormulario(prevData => {
      const updatedCobranca = Array.isArray(prevData.detalhesContrato.cobranca)
        ? [...prevData.detalhesContrato.cobranca]
        : []; // Crie um novo array se não for um array ainda
      if (updatedCobranca.includes(selectedOption)) {
        updatedCobranca.splice(updatedCobranca.indexOf(selectedOption), 1);
      } else {
        updatedCobranca.push(selectedOption);
      }
      return {
        ...prevData,
        detalhesContrato: {
          ...prevData.detalhesContrato,
          cobranca: updatedCobranca,
        },
      };
    });
  };

  const { activeStep, setDadosFormulario, dadosFormulario } = useMultiStepContext();

  if (activeStep !== 3) {
    return null;
  }

  return (
    <Container className={classes.container}>
      <Divider className={classes.divider} />
      <div className={classes.adjustDate}>
        <FormControl className={classes.formControl}>
          <FormLabel>Reajuste</FormLabel>
          <Select
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  reajuste: selectedOption,
                },
              }));
            }}>
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
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  dataInicio: selectedOption,
                },
              }));
            }}
          />
          <TextField
            label="Duração (em meses)"
            type="number"
            className={classes.input}
            InputProps={{ inputProps: { min: 1 } }}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  duracao: selectedOption,
                },
              }));
            }}
          />
          <TextField
            label="Fim"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  dataTermino: selectedOption,
                },
              }));
            }}
          />
        </div>
        <div>
          <TextField
            label="Valor de Aluguel"
            className={classes.input}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  valor: selectedOption,
                },
              }));
            }}
          />
          <TextField
            label="Dia de Vencimento"
            type="number"
            className={classes.input}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  vencimento: selectedOption,
                },
              }));
            }}
          />
          <TextField
            label="Ocupação"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  ocupacao: selectedOption,
                },
              }));
            }}
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
            control={<Checkbox value="Locatário" onChange={handleCobrancaChange} />}
            label="Locatário"
          />
          <FormControlLabel
            control={<Checkbox value="Proprietário" onChange={handleCobrancaChange} />}
            label="Proprietário"
          />
          <TextField
            label="Taxa de administração "
            type="text"
            className={classes.input}
            InputProps={{
              inputProps: {
                min: 0,
                max: 100,
                step: 0.01,
              },
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={event => {
              const selectedOption = event.target.value;
              setDadosFormulario(prevData => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  taxaAdministração: selectedOption,
                },
              }));
            }}
          />
        </FormGroup>
      </div>
    </Container>
  );
};

export default StepFour;

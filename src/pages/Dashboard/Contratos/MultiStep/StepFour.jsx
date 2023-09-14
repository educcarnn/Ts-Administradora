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
import { useState } from "react";

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
  inputNoArrows: {
    "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "-moz-appearance": "textfield",
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
  const [dataTerminoCalculada, setDataTerminoCalculada] = useState("");
  const [ocupacaoError, setOcupacaoError] = useState(false);
  const [cobrancaSelecionada, setCobrancaSelecionada] = useState("");

  const classes = useStyles();

  const handleCobrancaChange = (event) => {
    const selectedOption = event.target.value;

    // Se o checkbox já está marcado, desmarque-o
    if (cobrancaSelecionada === selectedOption) {
      setCobrancaSelecionada("");
      setDadosFormulario((prevData) => ({
        ...prevData,
        detalhesContrato: {
          ...prevData.detalhesContrato,
          cobranca: "",
        },
      }));
    } else {
      setCobrancaSelecionada(selectedOption);
      setDadosFormulario((prevData) => ({
        ...prevData,
        detalhesContrato: {
          ...prevData.detalhesContrato,
          cobranca: selectedOption,
        },
      }));
    }
  };

  const handleOcupacaoChange = (event) => {
    const ocupacao = event.target.value;
    const dataInicio = new Date(dadosFormulario.detalhesContrato.dataInicio);
    const dataOcupacao = new Date(ocupacao);

    if (dataOcupacao < dataInicio) {
      setOcupacaoError(true);
    } else {
      setOcupacaoError(false);
      setDadosFormulario((prevData) => ({
        ...prevData,
        detalhesContrato: {
          ...prevData.detalhesContrato,
          ocupacao: ocupacao,
        },
      }));
    }
  };

  const handleDuracaoChange = (event) => {
    const duracao = event.target.value;

    if (duracao) {
      const dataInicio = new Date(dadosFormulario.detalhesContrato.dataInicio);
      dataInicio.setMonth(dataInicio.getMonth() + parseInt(duracao));

      const year = dataInicio.getFullYear();
      const month = (dataInicio.getMonth() + 1).toString().padStart(2, "0");
      const day = dataInicio.getDate().toString().padStart(2, "0");

      const dataTermino = `${year}-${month}-${day}`;

      setDataTerminoCalculada(dataTermino);
      setDadosFormulario((prevData) => ({
        ...prevData,
        detalhesContrato: {
          ...prevData.detalhesContrato,
          duracao: duracao,
          dataTermino: dataTerminoCalculada, // Adicionando a data de término ao estado
        },
      }));
    }
  };

  const { activeStep, setDadosFormulario, dadosFormulario } =
    useMultiStepContext();

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
            onChange={(event) => {
              const selectedOption = event.target.value;
              setDadosFormulario((prevData) => ({
                ...prevData,
                detalhesContrato: {
                  ...prevData.detalhesContrato,
                  reajuste: selectedOption,
                },
              }));
            }}
          >
            <MenuItem value="INPC">INPC</MenuItem>
            <MenuItem value="IGPM">IGPM</MenuItem>
            <MenuItem value="IPCA">IPCA</MenuItem>
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
            onChange={(event) => {
              const selectedOption = event.target.value;
              setDadosFormulario((prevData) => ({
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
            onChange={handleDuracaoChange}
          />
          <TextField
            label="Fim"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            value={dataTerminoCalculada}
            disabled
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
            onChange={(event) => {
              const selectedOption = event.target.value;
              setDadosFormulario((prevData) => ({
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
            type="text"
            className={`${classes.input} ${classes.inputNoArrows}`}
            onChange={(event) => {
              const selectedOption = event.target.value;
              const isNumeric = /^[0-9]{1,2}$/.test(selectedOption); // Verifica se são apenas números e se há no máximo dois dígitos

              if (
                isNumeric &&
                parseInt(selectedOption, 10) >= 1 &&
                parseInt(selectedOption, 10) <= 30
              ) {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  detalhesContrato: {
                    ...prevData.detalhesContrato,
                    vencimento: selectedOption,
                  },
                }));
              } else if (selectedOption !== "") {
                alert("O dia de vencimento deve estar entre 1 e 30!");
              }
            }}
          />

          <TextField
            label="Ocupação"
            type="date"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            onChange={handleOcupacaoChange}
            error={ocupacaoError} // Aplica o erro ao campo de entrada
            helperText={
              ocupacaoError &&
              "A data de ocupação não pode ser menor que a data de início"
            }
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
            control={
              <Checkbox
                value="Locatário"
                checked={cobrancaSelecionada === "Locatário"}
                onChange={handleCobrancaChange}
              />
            }
            label="Locatário"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Proprietário"
                checked={cobrancaSelecionada === "Proprietário"}
                onChange={handleCobrancaChange}
              />
            }
            label="Proprietário"
          />
          <TextField
            label="Taxa de administração"
            type="text"
            className={classes.input}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={(event) => {
              const selectedOption = event.target.value;
              const isNumeric = /^[0-9]+(\.[0-9]{1,2})?$/.test(selectedOption);

              if (
                isNumeric &&
                parseFloat(selectedOption) >= 0 &&
                parseFloat(selectedOption) <= 100
              ) {
                setDadosFormulario((prevData) => ({
                  ...prevData,
                  detalhesContrato: {
                    ...prevData.detalhesContrato,
                    taxaAdministração: selectedOption,
                  },
                }));
              } else if (selectedOption !== "") {
                alert(
                  "A taxa de administração deve estar entre 0% e 100% e pode conter no máximo duas casas decimais!"
                );
              }
            }}
          />
        </FormGroup>
      </div>
    </Container>
  );
};

export default StepFour;

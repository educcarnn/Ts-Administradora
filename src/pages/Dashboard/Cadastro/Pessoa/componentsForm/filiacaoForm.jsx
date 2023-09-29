import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Label } from "../PessoaFisica";
import { RowContainer } from "../../../Imoveis/style";
import {
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  labelMargin: {
    marginBottom: theme.spacing(1),
  },
}));

const FiliacaoFormFields = ({ register, errors }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h6">Filiação</Typography>

      <RowContainer>
        <Label>
          Nome da mãe:
          <TextField
            type="text"
            {...register("filiacao.mae", { required: true })}
            error={!!errors["filiacao.mae"]}
            helperText={errors["filiacao.mae"] ? "Preencha este campo" : ""}
          />
        </Label>
        <Label>
          Nome do pai:
          <TextField
            type="text"
            {...register("filiacao.pai", { required: true })}
            error={!!errors["filiacao.pai"]}
            helperText={errors["filiacao.pai"] ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>

      <div className={classes.columnContainer}>
        <Label className={classes.labelMargin}>Estado Civil</Label>
        <Select
          label="Estado Civil"
          {...register("estadoCivil", { required: true })}
          error={Boolean(errors.estadoCivil)}
          fullWidth
        >
          <MenuItem value={"Víuva"}>Víuva</MenuItem>
          <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
          <MenuItem value={"Casado"}>Casado</MenuItem>
          <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
        </Select>
        <FormHelperText error={Boolean(errors.estadoCivil)}>
          {errors.estadoCivil ? "Preencha este campo" : ""}
        </FormHelperText>
      </div>

      <RowContainer>
        <Label>
          Nacionalidade:
          <TextField
            type="text"
            {...register("nacionalidade", { required: true })}
            error={!!errors.nacionalidade}
            helperText={errors.nacionalidade ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>

      <RowContainer>
        <Label>
          Telefone Fixo:
          <TextField
            type="text"
            {...register("dadosComuns.telefoneFixo", {
              required: true,
            })}
            maxLength="13"
            onKeyPress={(event) => {
              if (event.which < 48 || event.which > 57) {
                event.preventDefault();
              }
            }}
            onBlur={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              if (value.length === 10) {
                event.target.value = value.replace(
                  /(\d{2})(\d{4})(\d{4})/,
                  "($1) $2-$3"
                );
              }
            }}
          />
        </Label>
        <Label>
          Telefone Celular:
          <TextField
            type="text"
            {...register("dadosComuns.telefoneCelular", {
              required: true,
            })}
            maxLength="14"
            onKeyPress={(event) => {
              if (event.which < 48 || event.which > 57) {
                event.preventDefault();
              }
            }}
            onBlur={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              if (value.length === 11) {
                event.target.value = value.replace(
                  /(\d{2})(\d{5})(\d{4})/,
                  "($1) $2-$3"
                );
              }
            }}
            error={!!errors.telefoneCelular}
            helperText={errors.telefoneCelular ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>
    </>
  );
};

export default FiliacaoFormFields;

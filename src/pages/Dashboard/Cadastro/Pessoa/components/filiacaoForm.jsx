import React from "react";
// Importe todos os componentes necessários.
import { Label } from "../PessoaFisica";
import { RowContainer } from "../../../Imoveis/style";
import { TextField, Select, MenuItem, FormHelperText, Typography} from "@material-ui/core";
const FiliacaoFormFields = ({ register, errors }) => {
  return (
    <>
      <Typography variant="h6">Filiação</Typography>
      <RowContainer>
        <Label>
          <Label>Nome da mãe:</Label>
          <TextField
            type="text"
            {...register("filiacao.mae", { required: true })}
            error={!!errors["filiacao.mae"]}
            helperText={errors["filiacao.mae"] ? "Preencha este campo" : ""}
          />
        </Label>
        <Label>
          <Label>Nome do pai:</Label>
          <TextField
            type="text"
            {...register("filiacao.pai", { required: true })}
            error={!!errors["filiacao.pai"]}
            helperText={errors["filiacao.pai"] ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>

      <RowContainer>
        <Label>Estado Civil</Label>
        <Select
          label="Estado Civil"
          {...register("estadoCivil", { required: true })}
          error={Boolean(errors.estadoCivil)}
        >
          <MenuItem value={"Víuva"}>Víuva</MenuItem>
          <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
          <MenuItem value={"Casado"}>Casado</MenuItem>
          <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
        </Select>
        <FormHelperText>
          {errors.estadoCivil ? "Preencha este campo" : ""}
        </FormHelperText>
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
          />
        </Label>
        <Label>
          Telefone Celular:
          <TextField
            type="text"
            {...register("dadosComuns.telefoneCelular", {
              required: true,
            })}
            error={!!errors.telefoneCelular}
            helperText={errors.telefoneCelular ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>
    </>
  );
};

export default FiliacaoFormFields;

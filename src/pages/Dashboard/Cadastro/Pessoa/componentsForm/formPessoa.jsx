import React from "react";
// Certifique-se de importar seus componentes corretamente.
import { TextField, Autocomplete } from "@material-ui/core";
import { RowContainer } from "../../../Imoveis/style";
import { Label } from "../PessoaFisica";
const handleRGBlur = (event) => {
  const value = event.target.value.replace(/\D/g, ""); // remove caracteres não numéricos
  if (value.length === 9) {
    event.target.value = value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})/,
      "$1.$2.$3-$4"
    );
  }
};

const validateAge = (value) => {
  const birthDate = new Date(value);
  const currentDate = new Date();
  const eighteenYearsAgo = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 18)
  );

  // Se a data de nascimento for antes de 18 anos atrás, a validação passará.
  return (
    birthDate <= eighteenYearsAgo ||
    "Você deve ter pelo menos 18 anos para se registrar."
  );
};

const PessoaFormFields = ({ register, errors }) => {
  return (
    <>
      <RowContainer>
        <Label>
          <Label>Nome Completo:</Label>
          <TextField
            type="text"
            {...register("nome", { required: true })}
            error={errors.nome}
            helperText={errors.nome ? "Preencha este campo" : ""}
          />
        </Label>
        <Label>
          <Label>CPF:</Label>
          <TextField
            type="text"
            {...register("cpf", { required: true })}
            maxLength="14"
            onKeyPress={(event) => {
              if (event.which < 48 || event.which > 57) {
                event.preventDefault();
              }
            }}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              if (value.length === 11) {
                event.target.value = value.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  "$1.$2.$3-$4"
                );
              }
            }}
            error={errors.cpf}
            helperText={errors.cpf ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>
      <RowContainer>
        <Label>
          <Label>RG:</Label>
          <TextField
            type="text"
            {...register("identidade", { required: true })}
            error={errors.rg}
            helperText={errors.rg ? "Preencha este campo" : ""}
            onChange={handleRGBlur}
          />
        </Label>

        <Label>
          <Label> Orgão Expedidor:</Label>
          <TextField
            type="text"
            {...register("orgaoExpedidor", { required: true })}
            error={errors.orgaoExpedidor}
            helperText={errors.orgaoExpedidor ? "Preencha este campo" : ""}
          />
        </Label>
      </RowContainer>
      <Label>
        <Label> Data de Nascimento: </Label>
        <TextField
          type="date"
          {...register("dataNascimento", {
            required: "Preencha este campo",
            validate: validateAge,
          })}
          error={Boolean(errors.dataNascimento)}
          helperText={
            errors.dataNascimento ? errors.dataNascimento.message : ""
          }
        />
      </Label>
      <Label>
        <Label>Profissão:</Label>
        <TextField
          type="text"
          {...register("profissao", { required: true })}
          error={errors.profissao}
          helperText={errors.profissao ? "Preencha este campo" : ""}
        />
      </Label>
    </>
  );
};

export default PessoaFormFields;

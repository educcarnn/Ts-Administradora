import React from 'react';
// Certifique-se de importar seus componentes corretamente.
import { TextField } from '@material-ui/core';
import { RowContainer } from '../../../Imoveis/style';
import { Label } from '../PessoaFisica';

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
            onBlur={(event) => {
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
          <Label>Identidade:</Label>
          <TextField
            type="text"
            {...register("identidade", { required: true })}
            error={errors.identidade}
            helperText={errors.identidade ? "Preencha este campo" : ""}
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
        <Label>Data de Nascimento:</Label>
        <TextField
          type="date"
          {...register("dataNascimento", { required: true })}
          error={errors.dataNascimento}
          helperText={errors.dataNascimento ? "Preencha este campo" : ""}
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

import React from "react";
import { useForm } from "react-hook-form";
import {
  FormContainer,
  CheckboxLabel,
  FileInputLabel,
  Input,
  Label,
  FileInput,
  DivCadastro,
} from "./style.js";
import { DashboarDiv } from "../../style.js";

export default function Cadastro() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DashboarDiv>TS Administradora - Cadastro Pessoa Física</DashboarDiv>
      <DivCadastro>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <CheckboxLabel>
            <input type="checkbox" {...register("inquilino")} />
            Inquilino
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" {...register("proprietario")} />
            Proprietário
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" {...register("fiador")} />
            Fiador
          </CheckboxLabel>

          <Label>
            Nome Completo :
            <Input type="text" {...register("nome")} />
          </Label>

          <Label>
            CPF :
            <Input type="text" {...register("cpf")} />
          </Label>
          <Label>
            Identidade:
            <Input type="text" {...register("identidade")} />
          </Label>
          <Label>
            Orgão Expedidor:
            <Input type="text" {...register("orgaoExpedidor")} />
          </Label>
          <Label>
            Data de Nascimento:
            <Input type="text" {...register("dataNascimento")} />
          </Label>
          <Label>
            Profissão:
            <Input type="text" {...register("profissao")} />
          </Label>
          <Label>
            Estado Civil:
            <Input type="text" {...register("estadoCivil")} />
          </Label>
          <Label>
            Filiação:
            <Input
              type="text"
              placeholder="Nome da mãe"
              {...register("filiacao")}
            />
            <Input
              type="text"
              placeholder="Nome da pai"
              {...register("filiacao")}
            />
          </Label>
          <Label>
            Nacionalidade:
            <Input type="text" {...register("nacionalidade")} />
          </Label>
          <Label>
            Telefone Fixo:
            <Input type="text" {...register("telefone")} />
          </Label>
          <Label>
            Telefone Celular:
            <Input type="text" {...register("telefone")} />
          </Label>
          <Label>
            E-mail:
            <Input type="text" {...register("e-mail")} />
          </Label>

          <Label>
            <FileInputLabel htmlFor="pdfUpload">Anexos</FileInputLabel>
            <FileInput type="file" id="pdfUpload" {...register("pdf")} />
          </Label>
          <button type="submit">Enviar</button>
        </FormContainer>
      </DivCadastro>
    </div>
  );
}

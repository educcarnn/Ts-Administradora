import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { DashboarDiv } from "../style";

const DivCadastro = styled.div`
  background-color: white;
  color: black;
  height: 100;
`;

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const CheckboxLabel = styled(Label)`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
`;

export default function PessoaFisica() {
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
            Nome Completo:
            <Input type="text" {...register("nome")} />
          </Label>
          <Label>
            CPF:
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
              placeholder="Nome do pai"
              {...register("filiacao")}
            />
          </Label>
          <Label>
            Nacionalidade:
            <Input type="text" {...register("nacionalidade")} />
          </Label>
          <Label>
            Telefone Fixo:
            <Input type="text" {...register("telefoneFixo")} />
          </Label>
          <Label>
            Telefone Celular:
            <Input type="text" {...register("telefoneCelular")} />
          </Label>
          <Label>
            E-mail:
            <Input type="text" {...register("email")} />
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

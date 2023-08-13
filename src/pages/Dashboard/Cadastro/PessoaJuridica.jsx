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

export default function PessoaJuridica() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DashboarDiv>TS Administradora - Cadastro Pessoa Jurídica</DashboarDiv>
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
            CNPJ:
            <Input type="text" {...register("cnpj")} />
          </Label>
          <Label>
            Razão Social:
            <Input type="text" {...register("razaoSocial")} />
          </Label>
          <Label>
            Nome Fantasia:
            <Input type="text" {...register("nomeFantasia")} />
          </Label>
          <Label>
            Endereço:
            <Input type="text" {...register("endereco")} />
          </Label>
          <Label>
            Data de Abertura da Empresa:
            <Input type="text" {...register("dataAberturaEmpresa")} />
          </Label>
          <Label>
            Nome Sócio Administrador:
            <Input type="text" {...register("novoSocioAdministrador")} />
          </Label>
          <Label>
            Telefone:
            <Input type="text" {...register("telefone")} />
          </Label>
          <Label>
            E-mail:
            <Input type="text" {...register("e-mail")} />
          </Label>
          <Label>
            Endereço:
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

import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import { format } from "date-fns";
import { DashboarDiv } from "../style";
import axios from "axios"; // Importe a biblioteca Axios
import { API_URL } from "../../../db/Api";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const history = useHistory();

  const onSubmit = async (data) => {
    const funcao = [];
    if (data.inquilino) funcao.push("inquilino");
    if (data.proprietario) funcao.push("proprietario");
    if (data.fiador) funcao.push("fiador");

    try {
      const response = await axios.post(`${API_URL}/cadastrar-pessoa-fisica`, {
        tipo: "Física",
        funcao: funcao,
        nome: data.nome,
        cpf: data.cpf,
        identidade: data.identidade,
        orgaoExpedidor: data.orgaoExpedidor,
        dataNascimento: data.dataNascimento,
        profissao: data.profissao,
        estadoCivil: data.estadoCivil,
        filiacao: {
          mae: data.filiacaoMae,
          pai: data.filiacaoPai,
        },
        nacionalidade: data.nacionalidade,
        telefoneFixo: data.telefoneFixo,
        telefoneCelular: data.telefoneCelular,
        email: data.email,
      });
      console.log("Cadastro realizado com sucesso:", response.data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        history.push("/lista-pessoa-fisica"); // Redireciona para a rota de cadastro-lista
      }, 2000); // Tempo em milissegundos (2 segundos)
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
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
            <Input
              type="text"
              {...register("cpf")}
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
            />
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
            <Input type="date" {...register("dataNascimento")} />
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
            Filiação - Mãe:
            <Input type="text" {...register("filiacaoMae")} />
          </Label>
          <Label>
            Filiação - Pai:
            <Input type="text" {...register("filiacaoPai")} />
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
            {" "}
            Telefone Celular:{" "}
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
        <ToastContainer />
      </DivCadastro>
    </div>
  );
}

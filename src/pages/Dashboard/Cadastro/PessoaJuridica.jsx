import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboarDiv } from "../style";
import { API_URL } from "../../../db/Api";
import iconClipse from "../../../assets/clipse.png";
import { RowContainer } from "../style";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";

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

const CenteredLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10%;
`;

export default function PessoaJuridica() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const onSubmit = async (data) => {
    const funcao = [];
    if (data.inquilino) funcao.push("inquilino");
    if (data.proprietario) funcao.push("proprietario");
    if (data.fiador) funcao.push("fiador");

    try {
      const response = await axios.post(
        `${API_URL}/cadastrar-pessoa-juridica`,
        {
          tipo: "Jurídica",
          funcao: funcao,
          cnpj: data.cnpj,
          razaoSocial: data.razaoSocial,
          nomeFantasia: data.nomeFantasia,
          dataAberturaEmpresa: data.dataAberturaEmpresa,
          novoSocioAdministrador: data.novoSocioAdministrador,
          telefone: data.telefone,
          email: data.email,
          endereco: {
            cep: data.cep,
            endereco: data.endereco,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
          },
          dadoBancarios: {
            chavePix: pixKey,
            banco: bank,
            agencia: agency,
            conta: account,
          },
          anexos: data.anexo,
          lista_email: data.lista_email,
          lista_repasse: data.lista_repasse,
        }
      );

      console.log("Cadastro realizado com sucesso:", response.data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        history.push("/lista-pessoa-juridica");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);

      toast.error("Erro ao cadastrar. Por favor, tente novamente.");
    }
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
          <Label>Endereço</Label>
          <Label>
            CEP:
            <Input type="text" {...register("cep")} />
          </Label>
          <Label>
            Bairro:
            <Input type="text" {...register("bairro")} />
          </Label>
          <Label>
            Cidade:
            <Input type="text" {...register("cidade")} />
          </Label>
          <Label>
            Estado:
            <Input type="text" {...register("estado")} />
          </Label>
          <Label>
            Número:
            <Input type="number" {...register("numero")} />
          </Label>
          <Label>
            Andar:
            <Input type="number" {...register("andar")} />
          </Label>
          <Label>
            Data de Abertura da Empresa:
            <Input type="date" {...register("dataAberturaEmpresa")} />
          </Label>
          <Label>
            Sócio Administrador:
            <Input type="text" {...register("novoSocioAdministrador")} />
            <button>Adicionar</button>
          </Label>
          <Label>
            Telefone:
            <Input type="text" {...register("telefone")} />
          </Label>
          <Label>
            E-mail:
            <Input type="text" {...register("email")} />
          </Label>
          <RowContainer>
            <FormControl>
              <FormLabel>Forma de Pagamento</FormLabel>
              <Select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                <MenuItem value="pix">PIX</MenuItem>
                <MenuItem value="doc_ted">DOC/TED</MenuItem>
              </Select>
              {paymentMethod === "pix" && (
                <TextField
                  label="Chave PIX"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  margin="normal"
                />
              )}
              {paymentMethod === "doc_ted" && (
                <>
                  <TextField
                    label="Banco"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    margin="normal"
                  />
                  <RowContainer>
                    <TextField
                      label="Agência"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      label="Conta"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      margin="normal"
                    />
                  </RowContainer>
                </>
              )}
            </FormControl>
          </RowContainer>
          <CenteredLabel>
            <img
              src={iconClipse}
              alt="Anexar"
              style={{ width: "100px", height: "100px" }}
            />
            <FileInput type="file" id="pdfUpload" {...register("pdf")} />
          </CenteredLabel>
          <CenteredLabel>
            <Button type="submit">Enviar</Button>
          </CenteredLabel>
        </FormContainer>
        <ToastContainer />
      </DivCadastro>
    </div>
  );
}

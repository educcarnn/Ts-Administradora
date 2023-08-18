import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import { format } from "date-fns";
import { DashboarDiv } from "../style";
import axios from "axios"; // Importe a biblioteca Axios
import { API_URL } from "../../../db/Api";
import iconClipse from "../../../assets/clipse.png";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Select, MenuItem, Button} from "@material-ui/core";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { RowContainer } from "../../Dashboard/Imoveis/style";


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


const CenteredLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10%;
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
            Endereço:
            <Input type="text" {...register("endereco")} />
          </Label>
          <Label>Gênero</Label>
          <Select value={gender} onChange={handleGenderChange}>
            <MenuItem value="">
              <em>Selecione</em>
            </MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            <MenuItem value="masculino">Masculino</MenuItem>
          </Select>
          <Label>
            Estado Civil:
            <Input type="text" {...register("estadoCivil")} />
          </Label>
          <RowContainer>
            <Label>
              Filiação - Mãe:
              <Input type="text" {...register("filiacaoMae")} />
            </Label>
            <Label>
              Filiação - Pai:
              <Input type="text" {...register("filiacaoPai")} />
            </Label>
          </RowContainer>
          <Label>
            Nacionalidade:
            <Input type="text" {...register("nacionalidade")} />
          </Label>
          <RowContainer>
            <Label>
              Telefone Fixo:
              <Input type="text" {...register("telefoneFixo")} />
            </Label>
            <Label>
              {" "}
              Telefone Celular:{" "}
              <Input type="text" {...register("telefoneCelular")} />
            </Label>
          </RowContainer>

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

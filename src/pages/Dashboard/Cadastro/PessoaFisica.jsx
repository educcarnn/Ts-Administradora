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
import { useState } from "react";

import {
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  FormLabel,
  Select,
  FormControlLabel,
  Checkbox,
  FormGroup,
  MenuItem,
  FormHelperText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { RowContainer } from "../../Dashboard/Imoveis/style";

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: "2rem",
    marginTop: "0.8rem",
  },

  formController: {
    gap: "10%",
  },
}));

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
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [gender, setGender] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };


  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validateAtLeastOneChecked = (value) => {
    const isChecked = value === true;
    return isChecked || "Selecione pelo menos uma opção";
  };
  const Container = styled.div`
    width: 100%;
  `;

  const onSubmit = async (data) => {
    const funcao = [];
    if (data.inquilino) funcao.push("inquilino");
    if (data.proprietario) funcao.push("proprietario");
    if (data.fiador) funcao.push("fiador");

    try {
      const response = await axios.post(
        `${API_URL}/cadastrar-nova-pessoa-fisica`,
        {
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
          genero: data.genero,
          endereco: {
            cep: data.cep,
            endereco: data.endereco,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
          },
          dadoBancarios: {
            chavePix: data.chavePix,
            banco: data.banco,
            agencia: data.agencia,
            conta: data.conta,
          },
          anexos: data.anexos,
        }
      );

      console.log("Cadastro realizado com sucesso:", response.data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        history.push("/clientes"); // Redireciona para a rota de cadastro-lista
      }, 2000); // Tempo em milissegundos (2 segundos)
    } catch (error) {
      toast.error("Erro ao cadastrar");
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div>
      <DashboarDiv>TS Administradora - Cadastro Pessoa Física</DashboarDiv>
      <DivCadastro>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <RowContainer>
            <InputLabel component="legend">
              Selecione pelo menos uma opção:
            </InputLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox {...register("inquilino")} />}
                label="Inquilino"
              />
              <FormControlLabel
                control={<Checkbox {...register("proprietario")} />}
                label="Proprietário"
              />
              <FormControlLabel
                control={<Checkbox {...register("fiador")} />}
                label="Fiador"
              />
            </FormGroup>
            {errors.inquilino || errors.proprietario || errors.fiador ? (
              <FormHelperText error>
                Pelo menos uma opção deve ser selecionada
              </FormHelperText>
            ) : null}
          </RowContainer>

          <RowContainer>
            <Label>
              <InputLabel>Nome Completo:</InputLabel>
              <TextField
                type="text"
                {...register("nome", { required: true })}
                error={errors.nome}
                helperText={errors.nome ? "Preencha este campo" : ""}
              />
            </Label>
            <Label>
              <InputLabel>CPF:</InputLabel>
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
              <InputLabel>Identidade:</InputLabel>
              <TextField type="text" {...register("identidade")} />
            </Label>
            <Label>
              <InputLabel> Orgão Expedidor:</InputLabel>
              <TextField type="text" {...register("orgaoExpedidor")} />
            </Label>
          </RowContainer>

          <Label>
            <InputLabel>Data de Nascimento:</InputLabel>
            <TextField
              type="date"
              {...register("dataNascimento", { required: true })}
              error={errors.dataNascimento}
              helperText={errors.dataNascimento ? "Preencha este campo" : ""}
            />
          </Label>
          <Label>
            <InputLabel>Profissão:</InputLabel>
            <TextField
              type="text"
              {...register("profissao", { required: true })}
              error={errors.profissao}
              helperText={errors.profissao ? "Preencha este campo" : ""}
            />
          </Label>
          <Typography variant="h6" className={classes.marginBottom}>
            Endereço
          </Typography>
          <Label>
            <InputLabel>CEP: </InputLabel>
            <TextField type="text" {...register("cep")} />
          </Label>
          <RowContainer>
            <Label>
              Bairro:
              <TextField type="text" {...register("bairro")} />
            </Label>
            <Label>
              Cidade:
              <TextField type="text" {...register("cidade")} />
            </Label>
          </RowContainer>
          <RowContainer>
            <Label>
              Estado:
              <TextField type="text" {...register("estado")} />
            </Label>
            <Label>
              Número:
              <TextField type="number" {...register("numero")} />
            </Label>
            <Label>
              Andar:
              <TextField type="number" {...register("andar")} />
            </Label>
          </RowContainer>
          <Typography variant="h6">Filiação</Typography>
          <RowContainer>
            <Label>
              <InputLabel>Nome da mãe:</InputLabel>
              <TextField type="text" {...register("filiacaoMae")} />
            </Label>
            <Label>
              <InputLabel>Nome do pai:</InputLabel>
              <TextField type="text" {...register("filiacaoPai")} />
            </Label>
          </RowContainer>
          <RowContainer>
            <Label>
              Estado Civil:
              <TextField type="text" {...register("estadoCivil")} />
            </Label>
            <Label>
              Nacionalidade:
              <TextField type="text" {...register("nacionalidade")} />
            </Label>
          </RowContainer>

          <RowContainer>
            <Label>
              Telefone Fixo:
              <TextField type="text" {...register("telefoneFixo")} />
            </Label>
            <Label>
              {" "}
              Telefone Celular:{" "}
              <TextField type="text" {...register("telefoneCelular")} />
            </Label>
          </RowContainer>
          <Label>
            E-mail:
            <TextField type="text" {...register("email")} />
          </Label>
          <RowContainer>
            <FormControl>
              <FormLabel>Gênero</FormLabel>
              <Select {...register("genero")}>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="feminino">Feminino</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
            </FormControl>

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
                    register
                    margin="normal"
                  />
                </>
              )}
            </FormControl>
          </RowContainer>

          <CenteredLabel>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <img
                src={iconClipse}
                alt="Anexar"
                style={{ width: "50px", height: "50px", marginBottom: "10px" }}
              />
              <FileInput
                type="file"
                id="pdfUpload"
                onChange={handleFileChange}
                multiple
                {...register("pdf")}
              />
            </div>
          </CenteredLabel>
          <div>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
          <CenteredLabel>
            <Button type="submit">Enviar</Button>
          </CenteredLabel>
        </FormContainer>
        <ToastContainer />
      </DivCadastro>
    </div>
  );
}

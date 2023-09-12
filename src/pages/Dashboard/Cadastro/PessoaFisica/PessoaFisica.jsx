import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
// import { format } from "date-fns";
import { DashboarDiv } from "../../style";
import axios from "axios"; // Importe a biblioteca Axios
import { API_URL } from "../../../../db/Api";
import iconClipse from "../../../../assets/clipse.png";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { isExpired } from "react-jwt";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
  TextField,
  Button,
  Container,
  FormControl,
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
import { RowContainer } from "../../Imoveis/style";
import telaLogin from "../../../../assets/Videos/telaLogin.jpg";
import { Card, CardContent, Grid } from "@material-ui/core";
import { useModal } from "../../../../context/ModalContext";
const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: "2rem",
    marginTop: "0.8rem",
  },

  formController: {
    gap: "10%",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    background: "#f5f5f5",
  },
  videoBackground: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "200vh",
    objectFit: "cover",
    zIndex: "1",
  },
  card: {
    width: "80%",
    overflow: "auto",
    "@media (max-width: 800px)": {
      width: "95%",
    },
  },
}));

const DivCadastro = styled.div`
  background-color: #f5f5f5db;
  color: black;
  height: 100;
  z-index: 2;
  padding: 5%;
  margin-top: 1.5%;
  border-radius: 1rem;
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

const FileLabel = styled.label`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
`;

const ContainerElements = styled.div`
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 100%;
  max-height: 100vh;

  & > video {
    position: absolute;

    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1; // para garantir que o vídeo fique atrás do conteúdo
  }

  @media (max-width: 800px) {
    display: flex !important;
    flex-direction: column !important;
  }
`;

export default function PessoaFisica() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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
  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [dadosBancarios, setDadosBancarios] = useState({
    chavePix: "",
    banco: "",
    agencia: "",
    conta: "",
  });
  const { isModalOpen } = useModal();
  const location = useLocation();

  {
    /*
useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      if(isExpired(token)) {
        toast.error("O token expirou.");
        history.push("/");
      }
    } else {
      toast.error("Token não fornecido.");
      history.push("/");
    }
  }, [history, location.search]);
*/
  }

  const fetchAddressFromCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      return null;
    }
  };
  const handleCEPBlur = async (event) => {
    const cep = event.target.value.replace(/\D/g, ""); // remove caracteres não numéricos
    if (cep.length === 8) {
      const address = await fetchAddressFromCEP(cep);
      if (address) {
        setValue("bairro", address.bairro); // usando setValue da API do react-hook-form
        setValue("cidade", address.localidade);
        setValue("estado", address.uf);
        setValue("endereco", address.logradouro);
      } else {
        toast.error("Erro ao buscar o CEP. Tente novamente.");
      }
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
};

  const handleInputChange = (e, campo) => {
    setDadosBancarios((prevState) => ({
      ...prevState,
      [campo]: e.target.value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleRemoveFile = (indexToRemove) => {
    const newFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(newFiles);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const validateAtLeastOneChecked = (data) => {
    return data.inquilino || data.proprietario || data.fiador;
  };

  const Container = styled.div`
    width: 100%;
  `;
  const renderPaymentDetails = () => {
    if (paymentMethod === "pix") {
      return (
        <TextField
          label="Chave PIX"
          value={dadosBancarios.chavePix}
          onChange={(e) => handleInputChange(e, "chavePix")}
          margin="normal"
        />
      );
    }

    if (paymentMethod === "doc_ted") {
      return (
        <>
          <TextField
            label="Banco"
            value={dadosBancarios.banco}
            onChange={(e) => handleInputChange(e, "banco")}
            margin="normal"
          />
          <TextField
            label="Agência"
            value={dadosBancarios.agencia}
            onChange={(e) => handleInputChange(e, "agencia")}
            margin="normal"
          />
          <TextField
            label="Conta"
            value={dadosBancarios.conta}
            onChange={(e) => handleInputChange(e, "conta")}
            margin="normal"
          />
        </>
      );
    }

    return null;
  };

  const onSubmit = async (data) => {
    if (!validateAtLeastOneChecked(data)) {
      toast.error("Selecione pelo menos uma opção.");
      return;
    }

    const funcao = [];
    if (data.inquilino) funcao.push("Inquilino");
    if (data.proprietario) funcao.push("Proprietário");
    if (data.fiador) funcao.push("Fiador");

    try {
      const response = await API_URL.post(`/cadastrar-nova-pessoa-fisica`, {
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
        password: data.password,
        role: "user",
        genero: data.genero,
        endereco: {
          cep: data.cep,
          endereco: data.endereco,
          bairro: data.bairro,
          cidade: data.cidade,
          estado: data.estado,
        },
        dadoBancarios: {
          banco: dadosBancarios.banco,
          agencia: dadosBancarios.agencia,
          conta: dadosBancarios.conta,
          chavePix: dadosBancarios.chavePix,
        },
        anexos: data.anexos,
      });

      toast.success("Cadastro realizado com sucesso!");

      if (!isModalOpen) {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar");
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <>
      <DashboarDiv>TS Administradora - Cadastro Pessoa Física</DashboarDiv>
      <ContainerElements>
        <div
          className={classes.container}
          style={{
            backgroundImage: `url(${telaLogin})`,
          }}
        >
          <DivCadastro>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <RowContainer>
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
                {!validateAtLeastOneChecked(getValues()) && (
                  <FormHelperText error>
                    Pelo menos uma opção deve ser selecionada
                  </FormHelperText>
                )}
              </RowContainer>

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
                    helperText={
                      errors.dataNascimento ? "Preencha esta campo" : ""
                    }
                  />
                </Label>
                <Label>
                  <Label> Orgão Expedidor:</Label>
                  <TextField
                    type="text"
                    {...register("orgaoExpedidor", { required: true })}
                    errors={errors.orgaoExpedidor}
                    helperText={
                      errors.orgaoExpedidor ? "Preencha este campo " : ""
                    }
                  />
                </Label>
              </RowContainer>

              <Label>
                <Label>Data de Nascimento:</Label>
                <TextField
                  type="date"
                  {...register("dataNascimento", { required: true })}
                  error={errors.dataNascimento}
                  helperText={
                    errors.dataNascimento ? "Preencha este campo" : ""
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
              <Typography variant="h6" className={classes.marginBottom}>
                Endereço
              </Typography>
              <Label>
                <Label>CEP: </Label>
                <TextField
                  type="text"
                  {...register("cep", { required: true })}
                  errors={errors.cep}
                  helperText={errors.cep ? "Preencha este campo" : ""}
                  onBlur={handleCEPBlur}
                />
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
                  <TextField
                    type="text"
                    {...register("numero", { required: true })}
                    errors={errors.numero}
                    helperText={errors.numero ? "Preencha este campo" : ""}
                  />
                </Label>
                <Label>
                  Andar:
                  <TextField
                    type="text"
                    {...register("andar", { required: true })}
                    errors={errors.andar}
                    helperText={errors.andar ? "Preencha este campo" : ""}
                  />
                </Label>
              </RowContainer>
              <Typography variant="h6">Filiação</Typography>
              <RowContainer>
                <Label>
                  <Label>Nome da mãe:</Label>
                  <TextField
                    type="text"
                    {...register("filiacaoMae", { required: true })}
                    errors={errors.filiacaoMae}
                    helperText={errors.filiacaoMae ? "Preencha este campo" : ""}
                  />
                </Label>
                <Label>
                  <Label>Nome do pai:</Label>
                  <TextField
                    type="text"
                    {...register("filiacaoPai", { required: true })}
                    errors={errors.filiacaoPai}
                    helperText={errors.filiacaoPai ? "Preencha este campo" : ""}
                  />
                </Label>
              </RowContainer>
              <RowContainer>
                <Label>
                  Estado Civil:
                  <TextField
                    type="text"
                    {...register("estadoCivil", { required: true })}
                    errors={errors.estadoCivil}
                    helperText={errors.estadoCivil ? "Preencha este campo" : ""}
                  />
                </Label>
                <Label>
                  Nacionalidade:
                  <TextField
                    type="text"
                    {...register("nacionalidade", { required: true })}
                    errors={errors.nacionalidade}
                    helperText={
                      errors.nacionalidade ? "Preencha este campo" : ""
                    }
                  />
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
                  <TextField
                    type="text"
                    {...register("telefoneCelular", { required: true })}
                    errors={errors.telefoe}
                    helperText={
                      errors.telefoneCelular ? "Preencha este campo" : ""
                    }
                  />
                </Label>
              </RowContainer>

              <Typography variant="h6"> Campos para Login</Typography>
              <Label>
                E-mail:
                <TextField
                  type="text"
                  {...register("email", { required: true })}
                  errors={errors.email}
                  helperText={errors.email ? "Preencha este campo" : ""}
                />
              </Label>
              <Label>
                Senha:
                <TextField
                  type="password"
                  {...register("password", { required: true })}
                  errors={errors.password}
                  helperText={errors.password ? "Preencha este campo" : ""}
                />
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
                  {renderPaymentDetails()}
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
                    style={{
                      width: "50px",
                      height: "50px",
                      marginBottom: "10px",
                    }}
                  />
                  <FileInput
                    type="file"
                    id="pdfUpload"
                    onChange={handleFileChange}
                    multiple
                    {...register("pdf")}
                  />,
                  
                </div>
                <Label variant="h6">Identidade(Frente e Verso)</Label>
              </CenteredLabel>

              <div style={{ marginTop: "1rem" }}>
              {selectedFiles.map((file, index) => (
                <li key={index}>
                    {file.name}
                    <button onClick={() => handleRemoveFile(index)} style={{marginLeft: '10px'}}>
                        Remover
                    </button>
                </li>
            ))}
              </div>
              <CenteredLabel>
                <Button type="submit">Enviar</Button>
              </CenteredLabel>
            </FormContainer>
            <ToastContainer />
          </DivCadastro>
        </div>
      </ContainerElements>
    </>
  );
}

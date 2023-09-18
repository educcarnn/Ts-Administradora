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
import ComponenteAnexos from "./components/anexos";

import {
  TextField,
  Button,
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

import EnderecoForm from "./components/endereco";
import { useModal } from "../../../../context/ModalContext";
import AnexosForm from "./components/anexos";

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

export const DivCadastro = styled.div`
  background-color: #f5f5f5db;
  color: black;
  height: 100;
  z-index: 2;
  padding: 5%;
  margin-top: 1.5%;
  border-radius: 1rem;
`;

export const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const CenteredLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10%;
`;

export const ContainerElements = styled.div`
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
  const [anexos, setAnexos] = useState([]);
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
        setValue("dadosComuns.endereco.bairro", address.bairro); // usando setValue da API do react-hook-form
        setValue("dadosComuns.endereco.cidade", address.localidade);
        setValue("dadosComuns.endereco.estado", address.uf);
        setValue("dadosComuns.endereco.endereco", address.logradouro);
      } else {
        toast.error("Erro ao buscar o CEP. Tente novamente.");
      }
    }
  };
  
  const handleInputChange = (e, fieldName) => {
    const newValue = e.target.value;
    setDadosBancarios((prevDadosBancarios) => ({
      ...prevDadosBancarios,
      [fieldName]: newValue,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
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
    console.log("Dados a serem enviados:", data);
    if (!validateAtLeastOneChecked(data)) {
      toast.error("Selecione pelo menos uma opção.");
      return;
    }

    const funcao = [];
    if (data.inquilino) funcao.push("Inquilino");
    if (data.proprietario) funcao.push("Proprietário");
    if (data.fiador) funcao.push("Fiador");

    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("cpf", data.cpf);
    formData.append("identidade", data.identidade);
    formData.append("orgaoExpedidor", data.orgaoExpedidor);
    formData.append("dataNascimento", data.dataNascimento);
    formData.append("profissao", data.profissao);
    formData.append("estadoCivil", data.estadoCivil);

    // Preencha os dados de filiação
    formData.append("filiacao[mae]", data.filiacao.mae);
    formData.append("filiacao[pai]", data.filiacao.pai);

    formData.append("nacionalidade", data.nacionalidade);
    formData.append("genero", data.genero);

    // Preencha os dados comuns
    formData.append("dadosComuns[tipo]", "Física");
    funcao.forEach((item, index) => {
      formData.append(`dadosComuns[funcao][${index}]`, item);
    });
    formData.append("dadosComuns[telefoneFixo]", data.dadosComuns.telefoneFixo);
    formData.append(
      "dadosComuns[telefoneCelular]",
      data.dadosComuns.telefoneCelular
    );
    formData.append("dadosComuns[email]", data.dadosComuns.email);
    formData.append("dadosComuns[password]", data.dadosComuns.password);

    // Preencha os dados de endereço
    formData.append(
      "dadosComuns[endereco][cep]",
      data.dadosComuns.endereco.cep
    );
    formData.append(
      "dadosComuns[endereco][endereco]",
      data.dadosComuns.endereco.endereco
    );
    formData.append(
      "dadosComuns[endereco][bairro]",
      data.dadosComuns.endereco.bairro
    );
    formData.append(
      "dadosComuns[endereco][cidade]",
      data.dadosComuns.endereco.cidade
    );
    formData.append(
      "dadosComuns[endereco][estado]",
      data.dadosComuns.endereco.estado
    );

    // Preencha os dados bancários
    formData.append(
      "dadosComuns[dadoBancarios][chavePix]",
      dadosBancarios.chavePix
    );
    formData.append("dadosComuns[dadoBancarios][banco]", dadosBancarios.banco);
    formData.append(
      "dadosComuns[dadoBancarios][agencia]",
      dadosBancarios.agencia
    );
    formData.append("dadosComuns[dadoBancarios][conta]", dadosBancarios.conta);

    if (data.anexos && Array.isArray(data.anexos)) {
      data.anexos.forEach((file) => {
        formData.append("dadosComuns[anexos][]", file);
      });
    }

    try {
      const response = await API_URL.post(
        `/cadastrar-nova-pessoa-fisica`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      <DashboarDiv>TS Administradora - Clientes Pessoa Física</DashboarDiv>
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
              <EnderecoForm
                register={register}
                errors={errors}
                handleCEPBlur={handleCEPBlur}
                classes={classes}
              />
              <Typography variant="h6">Filiação</Typography>
              <RowContainer>
                <Label>
                  <Label>Nome da mãe:</Label>
                  <TextField
                    type="text"
                    {...register("filiacao.mae", { required: true })}
                    error={!!errors["filiacao.mae"]}
                    helperText={
                      errors["filiacao.mae"] ? "Preencha este campo" : ""
                    }
                  />
                </Label>
                <Label>
                  <Label>Nome do pai:</Label>
                  <TextField
                    type="text"
                    {...register("filiacao.pai", { required: true })}
                    error={!!errors["filiacao.pai"]}
                    helperText={
                      errors["filiacao.pai"] ? "Preencha este campo" : ""
                    }
                  />
                </Label>
              </RowContainer>
              <RowContainer>
                <Label>Estado Civil</Label>
                <Select
                  label="Estado Civil"
                  {...register("estadoCivil", { required: true })}
                  error={Boolean(errors.estadoCivil)}
                >
                  <MenuItem value={"Víuva"}>Víuva</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.estadoCivil ? "Preencha este campo" : ""}
                </FormHelperText>
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
                  <TextField
                    type="text"
                    {...register("dadosComuns.telefoneFixo", {
                      required: true,
                    })}
                  />
                </Label>
                <Label>
                  Telefone Celular:
                  <TextField
                    type="text"
                    {...register("dadosComuns.telefoneCelular", {
                      required: true,
                    })}
                    error={!!errors.telefoneCelular}
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
                  {...register("dadosComuns.email", { required: true })}
                  error={!!errors.email}
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
              <Label>
                Confirmar Senha:
                <TextField
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirmação de senha é obrigatória",
                    validate: (value) =>
                      value === getValues().password ||
                      "As senhas não coincidem",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
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

              <RowContainer>
                <AnexosForm register={register} setValue={setValue} />
              </RowContainer>

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

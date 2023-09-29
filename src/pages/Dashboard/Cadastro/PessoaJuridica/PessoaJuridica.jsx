import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DashboarDiv } from "../../style";
import { API_URL } from "../../../../db/Api";
import iconClipse from "../../../../assets/clipse.png";
import { RowContainer } from "../../Imoveis/style";
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
import AnexosForm from "./componentsForm/anexos";
import { ContainerElements } from "../Pessoa/PessoaFisica";
import telaLogin from "../../../../assets/Videos/telaLogin.jpg";
import EnderecoForm from "./componentsForm/endereco";
import AnexosFormJuridica from "./componentsForm/anexos";
import LoginFormFields from "./componentsForm/login";

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

export default function PessoaJuridica({ setDadosPessoaJuridica }) {
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
  const [pixKey, setPixKey] = useState("");
  const [bank, setBank] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dadosBancarios, setDadosBancarios] = useState({
    chavePix: "",
    banco: "",
    agencia: "",
    conta: "",
  });

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

  const renderPaymentDetails = () => {
    if (paymentMethod === "PIX") {
      return (
        <TextField
          label="Chave PIX"
          value={dadosBancarios.chavePix}
          onChange={(e) => handleInputChange(e, "chavePix")}
          margin="normal"
        />
      );
    }

    if (paymentMethod === "TED") {
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

  const onSubmit = async (data) => {
    const funcao = [];
    if (data.inquilino) funcao.push("Inquilino");
    if (data.proprietario) funcao.push("Proprietário");

    console.log(data);
    const formData = new FormData();
    formData.append("cnpj", data.cnpj);
    formData.append("razaoSocial", data.razaoSocial);
    formData.append("nomeFantasia", data.nomeFantasia);
    formData.append("dataAberturaEmpresa", data.dataAberturaEmpresa);
    formData.append("novoSocioAdministrador", data.novoSocioAdministrador);
    formData.append("dadosComuns[tipo]", "Jurídica");
    funcao.forEach((item, index) => {
      formData.append(`dadosComuns[funcao][${index}]`, item);
    });
    formData.append("dadosComuns[telefoneFixo]", data.telefone);
    formData.append("dadosComuns[telefoneCelular]", data.telefoneCelular);
    formData.append("dadosComuns[email]", data.email);
    formData.append("dadosComuns[password]", data.password);
    formData.append("dadosComuns[endereco][cep]", data.cep);
    formData.append("dadosComuns[endereco][endereco]", data.endereco);
    formData.append("dadosComuns[endereco][bairro]", data.bairro);
    formData.append("dadosComuns[endereco][cidade]", data.cidade);
    formData.append("dadosComuns[endereco][estado]", data.estado);

    // Dados Bancários
    formData.append("dadosComuns[tipoPagamento]", paymentMethod);
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
        `/cadastrar-nova-pessoa-juridica`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Defina o cabeçalho correto
          },
        }
      );

      toast.success("Cadastro realizado com sucesso!");
      setDadosPessoaJuridica(response.data.novaPessoaJuridica);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar. Por favor, tente novamente.");
    }
  };

  const validateAtLeastOneChecked = (data) => {
    return data.inquilino || data.proprietario;
  };
  return (
    <>
      <DashboarDiv>TS Administradora - Clientes Pessoa Jurídica</DashboarDiv>
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
                </FormGroup>
                {!validateAtLeastOneChecked(getValues()) && (
                  <FormHelperText error>
                    Pelo menos uma opção deve ser selecionada
                  </FormHelperText>
                )}
              </RowContainer>

              <RowContainer>
                <Label>
                  <Label>Razão Social:</Label>
                  <TextField
                    type="text"
                    {...register("razaoSocial", { required: true })}
                    error={errors.razaoSocial}
                    helperText={errors.razaoSocial ? "Preencha este campo" : ""}
                  />
                </Label>
                <Label>
                  <Label>CNPJ:</Label>
                  <TextField
                    type="text"
                    {...register("cnpj", { required: true })}
                    error={errors.cnpj}
                    helperText={errors.cnpj ? "Preencha este campo" : ""}
                    maxLength="18"
                    onKeyPress={(event) => {
                      if (event.which < 48 || event.which > 57) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      if (value.length === 14) {
                        event.target.value = value.replace(
                          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                          "$1.$2.$3/$4-$5"
                        );
                      }
                    }}
                  />
                </Label>
              </RowContainer>

              <RowContainer>
                <Label>
                  <Label>Nome Fantasia:</Label>
                  <TextField
                    type="text"
                    {...register("nomeFantasia", { required: true })}
                    error={errors.nomeFantasia}
                    helperText={
                      errors.nomeFantasia ? "Preencha este campo" : ""
                    }
                  />
                </Label>
                <Label>
                  <Label>Sócio Administrador:</Label>
                  <TextField
                    type="text"
                    {...register("novoSocioAdministrador", { required: true })}
                    error={errors.novoSocioAdministrador}
                    helperText={
                      errors.novoSocioAdministrador ? "Preencha este campo" : ""
                    }
                  />
                </Label>
                <Label>
                  <Label>Data de Abertura da Empresa:</Label>
                  <TextField
                    type="date"
                    {...register("dataAberturaEmpresa", { required: true })}
                    error={errors.dataAberturaEmpresa}
                    helperText={
                      errors.dataAberturaEmpresa ? "Preencha este campo" : ""
                    }
                  />
                </Label>
              </RowContainer>

              <Typography variant="h6">Contato</Typography>
              <RowContainer>
                <Label>
                  Telefone Fixo:
                  <TextField
                    type="text"
                    {...register("telefoneFixo")}
                    maxLength="13"
                    onKeyPress={(event) => {
                      if (event.which < 48 || event.which > 57) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      if (value.length === 10) {
                        event.target.value = value.replace(
                          /(\d{2})(\d{4})(\d{4})/,
                          "($1) $2-$3"
                        );
                      }
                    }}
                  />
                </Label>
                <Label>
                  Telefone Celular:
                  <TextField
                    type="text"
                    {...register("telefoneCelular")}
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
                          /(\d{2})(\d{5})(\d{4})/,
                          "($1) $2-$3"
                        );
                      }
                    }}
                  />
                </Label>
              </RowContainer>

              <EnderecoForm
                register={register}
                errors={errors}
                handleCEPBlur={handleCEPBlur}
                classes={classes}
              />

              <LoginFormFields
                register={register}
                errors={errors}
                getValues={getValues}
              />
              <FormControl>
                <FormLabel>Forma de Pagamento</FormLabel>
                <Select
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  name="dadosComuns.tipoPagamento" // Altere esta linha
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="PIX">PIX</MenuItem>
                  <MenuItem value="TED">TED</MenuItem>
                </Select>
                {renderPaymentDetails()}
              </FormControl>

              <RowContainer>
                <AnexosFormJuridica register={register} setValue={setValue} />
              </RowContainer>

              <CenteredLabel>
                <Button type="submit">Enviar</Button>
              </CenteredLabel>
            </FormContainer>
          </DivCadastro>
        </div>
      </ContainerElements>
    </>
  );
}

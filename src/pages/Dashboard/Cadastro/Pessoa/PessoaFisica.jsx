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
import PessoaFormFields from "./componentsForm/formPessoa";
import FiliacaoFormFields from "./componentsForm/filiacaoForm";
import LoginFormFields from "./componentsForm/login";
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

import EnderecoForm from "./componentsForm/endereco";
import { useEffect } from "react";
import AnexosForm from "./componentsForm/anexos";

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

export default function PessoaFisica({ setDadosPessoaFisica }) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const location = useLocation();

  const [empresaId, setEmpresaId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dadosBancarios, setDadosBancarios] = useState({
    chavePix: "",
    banco: "",
    agencia: "",
    conta: "",
  });

  // Dentro do componente
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    setEmpresaId(new URLSearchParams(location.search).get("empresaId"));

    if (token) {
      if (isExpired(token)) {
        toast.error("O token expirou.");
        history.push("/");
      }
    } else {
      toast.error("Token não fornecido.");
      history.push("/");
    }
  }, [history, location.search]);

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

  const onSubmit = async (data) => {
    if (!validateAtLeastOneChecked(data)) {
      toast.error("Selecione pelo menos uma opção.");
      return;
    }
    console.log(data);

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
    formData.append("password", data.password);
    formData.append("empresa[id]", empresaId);

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
    //Numero e andar
    formData.append(
      "dadosComuns[endereco][numero]",
      data.dadosComuns.endereco.numero
    );
    formData.append(
      "dadosComuns[endereco][andar]",
      data.dadosComuns.endereco.andar
    );

    // Preencha os dados bancários
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
        `/cadastrar-nova-pessoa-fisica`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
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

              <PessoaFormFields
                register={register}
                errors={errors}
                control={control}
              />
              <EnderecoForm
                register={register}
                errors={errors}
                handleCEPBlur={handleCEPBlur}
                classes={classes}
              />
              <FiliacaoFormFields register={register} errors={errors} />
              <LoginFormFields
                register={register}
                errors={errors}
                getValues={getValues}
              />
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
                    name="dadosComuns.tipoPagamento"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    <MenuItem value="PIX">PIX</MenuItem>
                    <MenuItem value="TED">TED</MenuItem>
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
          </DivCadastro>
        </div>
      </ContainerElements>
    </>
  );
}

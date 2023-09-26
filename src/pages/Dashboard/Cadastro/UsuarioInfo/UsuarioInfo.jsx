import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { DashboarDiv } from "../../style";
import { API_URL } from "../../../../db/Api";
import Sidebar from "../../../../components/DashboardComponents/Sidebar";

import { keyMapping } from "./components/keyMapping";
import DadosCadastro from "./components/dados/dadosCadastro";
import Filiacao from "./components/filiacao";
import MoreInformations from "./components/moreInformations";
import Telefones from "./components/telefones";
import Endereco from "./components/camposEndereco";
import DadosBancarios from "./components/dados/dadosBancarios";
import _ from "lodash";
import background from "../../../../assets/Videos/fundoClientes.png";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { RowItems } from "../../style";
import Anexos from "./components/anexos";
import Container from "./components/container/container";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // 100% da altura da viewport
    width: "100%", // 100% da largura
    background: "#f5f5f5", // fundo da página, pode ajustar conforme necessidade
  },
  card: {
    width: "80%",
    backgroundColor: "#f5f5f5db !important",
    padding: "20px",
    height: "100vh",
    overflow: "auto !important",
    boxSizing: "border-box",
    "@media (max-width: 800px)": {
      overflow: "auto !important",
    },
  },
});

const ContainerElements = styled.div`
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 800px) {
    display: flex !important;
    flex-direction: column !important;
  }
`;

export default function UsuarioInfo() {
  const classes = useStyles();

  const { id } = useParams();
  const [pessoaInfo, setPessoaInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [anexos, SetAnexos] = useState([]);
  const [dadosBancarios, setDadosBancarios] = useState({});
  const [camposEndereco, setCamposEndereco] = useState({});
  const [phones, setPhones] = useState({});
  const [info, setInfo] = useState({});
  const [filiacao, setFiliacao] = useState({});
  const [moreInformations, setMoreInformations] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [fiador, setFiador] = useState([]);

  useEffect(() => {
    async function fetchPessoaInfo() {
      try {
        const response = await API_URL.get(`/pessoa/${id}`);
        setPessoaInfo(response.data);
        console.log(response.data);

        SetAnexos(response.data.dadosComuns.anexos);
        setFiador({
          fiador: response?.data?.fiador,
        });
        const leftInfoFields = {
          ID: id,
          Tipo: response.data.dadosComuns.tipo,
          Função: Array.isArray(response.data.funcao)
            ? response.data.dadosComuns?.funcao.join(", ")
            : response.data.dadosComuns?.funcao,
          Nome: response.data.nome,
          CPF: response.data.cpf,
          Identidade: response.data.identidade,
        };

        const Filiacao = {
          mae: response.data?.filiacao?.mae,
          pai: response.data?.filiacao?.pai,
        };

        const MoreInformations = {
          "Órgão Expedidor": response.data?.orgaoExpedidor,
          "Data de Nascimento": new Date(
            response.data?.dataNascimento
          ).toLocaleDateString(),
          Profissão: response.data?.profissao,
          "Estado Civil": response.data?.estadoCivil,
          Nacionalidade: response.data?.nacionalidade,
          "E-mail": response.data?.dadosComuns?.email,
        };

        const Telefones = {
          "Telefone Fixo": response.data?.dadosComuns?.telefoneFixo,
          "Telefone Celular": response.data?.dadosComuns?.telefoneCelular,
        };

        const CamposEndereco = {
          Bairro: response.data?.dadosComuns?.endereco?.bairro,
          CEP: response.data?.dadosComuns.endereco?.cep,
          Cidade: response.data?.dadosComuns?.endereco?.cidade,
          Endereco: response.data?.dadosComuns?.endereco?.endereco,
          Estado: response.data?.dadosComuns?.endereco?.estado,
        };

        const DadosBancarios = {
          Banco: response.data?.dadosComuns?.dadoBancarios?.banco,
          Conta: response.data?.dadosComuns?.dadoBancarios?.conta,
          Agencia: response.data?.dadosComuns?.dadoBancarios?.agencia,
          ChavePix: response.data?.dadosComuns?.dadoBancarios?.chavePix,
        };

        setDadosBancarios(DadosBancarios);
        setCamposEndereco(CamposEndereco);
        setPhones(Telefones);
        setMoreInformations(MoreInformations);
        setFiliacao(Filiacao);
        setInfo(leftInfoFields);

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar informações da pessoa:", error);
      }
    }

    fetchPessoaInfo();
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleInfoChange = (key, newValue) => {
    const infoKeys = ["ID", "Tipo", "Função", "Nome", "CPF", "Identidade"];
    const filiacaoKeys = ["mae", "pai"];
    const moreInfoKeys = [
      "Órgão Expedidor",
      "Data de Nascimento",
      "Profissão",
      "Estado Civil",
      "Nacionalidade",
      "E-mail",
    ];
    const phoneKeys = ["Telefone Fixo", "Telefone Celular"];
    const addressKeys = [
      "Rua",
      "Numero",
      "Complemento",
      "Bairro",
      "Cidade",
      "Estado",
      "CEP",
      "Endereco",
    ];
    const bankersKeys = ["Banco", "Conta", "Agencia", "ChavePix"];

    if (infoKeys.includes(key)) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        [key]: newValue,
      }));
    } else if (filiacaoKeys.includes(key)) {
      setFiliacao((prevFiliacao) => ({
        ...prevFiliacao,
        [key]: newValue,
      }));
    } else if (moreInfoKeys.includes(key)) {
      setMoreInformations((prevMoreInfo) => ({
        ...prevMoreInfo,
        [key]: newValue,
      }));
    } else if (phoneKeys.includes(key)) {
      setPhones((prevPhones) => ({
        ...prevPhones,
        [key]: newValue,
      }));
    } else if (addressKeys.includes(key)) {
      setCamposEndereco((prevAddress) => ({
        ...prevAddress,
        [key]: newValue,
      }));
    } else if (bankersKeys.includes(key)) {
      setDadosBancarios((prevAddress) => ({
        ...prevAddress,
        [key]: newValue,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const allInfo = {
        ...filiacao,
        ...moreInformations,
        ...phones,
        ...camposEndereco,
        ...dadosBancarios,
      };

      const mappedInfo = Object.entries(allInfo).reduce((acc, [key, value]) => {
        const originalKey = keyMapping[key];
        if (originalKey) {
          _.set(acc, originalKey, value);
        }
        return acc;
      }, {});

      await API_URL.patch(`/pessoa-patch/${id}`, mappedInfo);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
    }
  };

  return (
    <>
      <DashboarDiv>
        <div>TS Administradora</div>
      </DashboarDiv>
      <Sidebar />
      <ContainerElements
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Card className={classes.card}>
          <RowItems>
            {!isEditing ? (
              <Button color="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            ) : (
              <>
                <Button color="secondary" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={handleSave}>
                  Salvar
                </Button>
              </>
            )}
          </RowItems>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Informações de {pessoaInfo.nome}
            </Typography>{" "}
            <Divider />
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6}>
                <DadosCadastro
                  info={info}
                  isEditing={isEditing}
                  handleInfoChange={handleInfoChange}
                />
                <Grid item xs={12} sm={6}>
                  <Filiacao
                    filiacaoData={filiacao}
                    isEditing={isEditing}
                    handleInfoChange={handleInfoChange}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MoreInformations
                  moreData={moreInformations}
                  handleInfoChange={handleInfoChange}
                  isEditing={isEditing}
                />
                <RowItems item xs={12} sm={6}>
                  <Telefones
                    phoneData={phones}
                    handleInfoChange={handleInfoChange}
                    isEditing={isEditing}
                  />
                </RowItems>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6}>
                <DadosBancarios
                  bankerData={dadosBancarios}
                  handleInfoChange={handleInfoChange}
                  isEditing={isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Anexos data={anexos} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Endereco
                  addressData={camposEndereco}
                  handleInfoChange={handleInfoChange}
                  isEditing={isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Container pessoaInfo={pessoaInfo} fiador={fiador} />
      </ContainerElements>
    </>
  );
}

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

import DadosCadastro from "./components/dados/dadosCadastro";
import MoreInformations from "./components/informations/moreInformations";
import Telefones from "./components/others/telefones";
import Endereco from "./components/informations/camposEndereco";
import DadosBancarios from "./components/dados/dadosBancarios";
import _ from "lodash";
import background from "../../../../assets/Videos/fundoClientes.png";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { RowItems } from "../../style";
import Anexos from "./components/anexos";
import Container from "./components/container/container";
import Funcao from "./components/others/funcao";

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

export default function UsuarioInfoJuridica() {
  const classes = useStyles();

  const { id } = useParams();
  const [pessoaInfo, setPessoaInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [anexos, SetAnexos] = useState([]);
  const [dadosBancarios, setDadosBancarios] = useState([]);
  const [camposEndereco, setCamposEndereco] = useState([]);
  const [info, setInfo] = useState({});
  const [filiacao, setFiliacao] = useState([]);
  const [moreInformations, setMoreInformations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [fiador, setFiador] = useState([]);
  const [dadosComunsID, setDadosComunsID] = useState([]);
  const [funcao, setFuncao] = useState([]);
  const [telefones, setTelefones] = useState([]);
  const [tipoPagamento, setTipoPagamento] = useState([]);
  const [socios, setSocios] = useState([]);
  const [submit, setSubmit] = useState(false);

  const handleFuncaoChange = (novaFuncao, campo) => {
    setFuncao((prevState) => {
      return {
        ...prevState,
        dadosComuns: {
          ...prevState.dadosComuns,
          [campo]: novaFuncao,
        },
      };
    });
  };
  const handleTelefoneChange = (campo, valor) => {
    setTelefones((prevState) => ({
      ...prevState,
      [campo]: valor,
    }));
  };

  const handleFiliacao = (campo, newValue) => {
    setFiliacao((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleEndereco = (campo, newValue) => {
    setCamposEndereco((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleDadosBancarios = (campo, newValue) => {
    setDadosBancarios((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };
  const handleTipoPagamento = (newValue) => {
    setTipoPagamento((prevState) => ({
      ...prevState,
      tipoPagamento: newValue,
    }));
  };
  const handleMoreInformations = (campo, newValue) => {
    setMoreInformations((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  useEffect(() => {
    async function fetchPessoaInfo() {
      try {
        const response = await API_URL.get(`/pessoa-juridica/${id}`);
        setPessoaInfo(response.data);

        SetAnexos({
          anexos: response?.data?.dadosComuns?.anexos,
          id: response?.data?.id,
        });
        setFiador({
          fiador: response?.data?.fiador,
        });

        setFuncao({
          funcao: response.data?.dadosComuns?.funcao,
        });

        setTelefones({
          telefoneFixo: response.data?.dadosComuns?.telefoneFixo,
          telefoneCelular: response.data?.dadosComuns?.telefoneCelular,
        });

        setDadosComunsID({
          id: response?.data?.dadosComuns.id,
        });

        const leftInfoFields = {
          "Nome Fantasisa": response.data.nomeFantasia,
          "Razão Social": response.data.razaoSocial,
          CNPJ: response.data.cnpj,
          "E-mail": response.data?.dadosComuns?.email,
        };

        setFiliacao({
          mae: response.data?.filiacao?.mae,
          pai: response.data?.filiacao?.pai,
        });

        setMoreInformations({
          dataAberturaEmpresa: response?.data?.dataAberturaEmpresa,
        });
        setSocios({
          id: response?.data?.id,
          socios: response?.data?.socios,
        });

        setCamposEndereco({
          cep: response.data?.dadosComuns.endereco?.cep,
          bairro: response.data?.dadosComuns?.endereco?.bairro,
          cidade: response.data?.dadosComuns?.endereco?.cidade,
          endereco: response.data?.dadosComuns?.endereco?.endereco,
          estado: response.data?.dadosComuns?.endereco?.estado,
          numero: response.data?.dadosComuns?.endereco?.numero,
          andar: response.data?.dadosComuns?.endereco?.andar
        });
        setTipoPagamento({
          tipoPagamento: response.data?.dadosComuns?.tipoPagamento,
        });
        setDadosBancarios({
          banco: response.data?.dadosComuns?.dadoBancarios?.banco,
          conta: response.data?.dadosComuns?.dadoBancarios?.conta,
          agencia: response.data?.dadosComuns?.dadoBancarios?.agencia,
          chavePix: response.data?.dadosComuns?.dadoBancarios?.chavePix,
        });

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

  const handleSave = async () => {
    const dadosComunsData = {
      id: dadosComunsID.id,
      funcao: funcao?.funcao,
      telefoneFixo: telefones.telefoneFixo,
      telefoneCelular: telefones.telefoneCelular,
      endereco: camposEndereco,
      tipoPagamento: tipoPagamento.tipoPagamento,
      dadoBancarios: dadosBancarios,
    };

    const pessoaData = {
      ...moreInformations,
    };

    try {
      const allInfo = {
        dadosComuns: dadosComunsData,
        ...pessoaData,
      };

      await API_URL.patch(`/pessoa-juridica-patch/${id}`, allInfo);
      setSubmit(true);
      console.log(submit);
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
              Informações de {pessoaInfo.razaoSocial}
            </Typography>{" "}
            <Divider />
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6}>
                <DadosCadastro info={info} isEditing={isEditing} />
                <Funcao
                  funcao={funcao}
                  isEditing={isEditing}
                  handleFuncaoChange={handleFuncaoChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MoreInformations
                  moreData={moreInformations}
                  handleMoreInformations={handleMoreInformations}
                  socios={socios}
                  submit={submit}
                  setSocios={setSocios}
                  isEditing={isEditing}
                />
                <RowItems item xs={12} sm={6}>
                  <Telefones
                    phoneData={telefones}
                    handleTelefoneChange={handleTelefoneChange}
                    isEditing={isEditing}
                  />
                </RowItems>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid item xs={12} sm={6}>
                <DadosBancarios
                  bankerData={dadosBancarios}
                  handleInfoChange={handleDadosBancarios}
                  isEditing={isEditing}
                  tipoPagamento={tipoPagamento}
                  handleTipoPagamento={handleTipoPagamento}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Anexos anexos={anexos} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Endereco
                  addressData={camposEndereco}
                  handleInfoChange={handleEndereco}
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

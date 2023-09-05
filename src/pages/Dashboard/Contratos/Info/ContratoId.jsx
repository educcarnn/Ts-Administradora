import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../db/Api";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Input,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Card, CardContent, Box, Button } from "@material-ui/core";
import { DashboarDiv } from "../../style";
import Sidebar from "../../../../components/DashboardComponents/Sidebar/index";
import styled from "styled-components";
import fundoContrato from "../../../../assets/Videos/contratos.jpg";
import DeleteIcon from "@material-ui/icons/Delete";
import Contrato from "./components/contrato";
import Reajuste from "./components/Reajuste";
import Despesas from "./components/Despesas";
import Cobrancas from "./components/Cobrancas";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "80%",
    height: "100vh",
    backgroundColor: "#f5f5f5db !important",
    padding: "20px",
    overflow: "auto !important",
    boxSizing: "border-box",
    "@media (max-width: 800px)": {
      overflow: "auto !important",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // 100% da altura da viewport
    width: "100%", // 100% da largura
    background: "#f5f5f5", // fundo da página, pode ajustar conforme necessidade
  },

  section: {
    flex: 1,
    marginRight: theme.spacing(4), // Adicionado espaçamento entre as seções
  },
  title: {
    fontSize: "1.25rem",
    marginBottom: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(1),
  },
  peopleList: {
    listStyle: "none",
    padding: 0,
  },
  personItem: {
    marginBottom: theme.spacing(2),
  },
}));

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

function ContractEdit() {
  const { id } = useParams();
  const classes = useStyles();

  const [contractDetails, setContractDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const propertyNames = {
    id: "ID",
    tipoContrato: "Tipo de Contrato",
    tipo: "Tipo de Garantia",
    valor: "Valor",
    apolice: "Apólice",
    dataInicio: "Data Início",
    observacao: "Observação",
    seguradora: "Seguradora",
    dataTermino: "Data Término",
    numeroParcelas: "Número de Parcelas",
    cpf: "CPF",
    nome: "Nome",
    telefoneCelular: "Telefone Celular",
  };

  const dadosReajuste = {
    indice: "IGPM",
    ultimoReajuste: "Ago/2020",
    proximoReajuste: "Ago/2021",
  };

  const locador = {
    nome: "Erika Bolena Pereira",
  };

  const locatarios = [
    { nome: "PAULO MURILO PEREIRA DA SILVA", principal: true },
    { nome: "jose carlos figueiredo poleshuck", principal: false },
  ];

  const despesasDoMes = [
    { descricao: "Despesa 1", valor: "100.00" },
    { descricao: "Despesa 2", valor: "50.00" },
  ];

  const listaDeCobrancas = [
    {
      vencimento: "10/07/2022",
      cliente: "Paulo Murilo Pereira Da Silva",
      valor: "R$ XXXX,XX",
      detalhes:
        "Recebida cobrança 213809942 (id interno 1760), com Boleto, creditada em 07/07/2022 em PJ Bank (Conta Digital PJBank).",
    },
    // ... outras cobranças ...
  ];

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await API_URL.get(`/obter-contrato/${id}`);

        setContractDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do contrato:", error);
      }
    };

    fetchContractDetails();
  }, [id]);
  const getLabel = (key) => propertyNames[key] || key;

  return (
    <>
      <DashboarDiv>
        <div>TS Administradora</div>
      </DashboarDiv>
      <Sidebar />
      <ContainerElements style={{ backgroundImage: `url(${fundoContrato})` }}>
        <Card className={classes.card}>
          <CardContent>
            <>
              <Box marginBottom={2}>
                <Typography variant="h5" gutterBottom>
                  {`Detalhes do Contrato #${id}`}
                </Typography>
                <Box marginBottom={2}>
                  {!isEditing ? (
                    <>
                      <Button
                        color="primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Editar
                      </Button>
                      <DeleteIcon
                        color="secondary"
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        color="secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button color="primary">Salvar</Button>
                    </>
                  )}
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Contrato />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Despesas despesas={despesasDoMes} />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Reajuste
                    dadosReajuste={dadosReajuste}
                    locador={locador}
                    locatarios={locatarios}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Cobrancas cobrancas={listaDeCobrancas} />{" "}
                 
                </Grid>
              </Grid>
            </>
          </CardContent>
        </Card>
      </ContainerElements>
    </>
  );
}

export default ContractEdit;

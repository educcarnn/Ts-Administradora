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
import { toast } from "react-toastify";
import { keyMapping } from "./components/keyMapping";
import _ from "lodash";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();
  const classes = useStyles();

  const [contractDetails, setContractDetails] = useState({});
  const [reajuste, setReajuste] = useState({});

  const [isEditing, setIsEditing] = useState(false);

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
  ];

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await API_URL.get(`/obter-contrato/${id}`);

        const CampoContrato = {
          proprietario: {
            id: response.data?.proprietario?.id,
            nome: response.data?.proprietario?.nome,
            dadoBancarios: response.data?.proprietario?.dadoBancarios?.chavePix,
          },
          inquilino: {
            id: response.data?.inquilino?.id,
            nome: response.data?.inquilino?.nome,
            dadoBancarios: response.data?.inquilino?.dadoBancarios?.chavePix,
          },
          detalhesContrato: {
            valor: response.data?.detalhesContrato?.valor,
            taxaAdministração: response.data?.detalhesContrato?.taxaAdministração,
            cobranca: response.data?.detalhesContrato?.cobranca,
          },
          imovel: {
            id: response.data?.imovel?.id,
            tipo: response.data?.imovel?.tipoImovel,
            Localizacao: {
              Bairro: response.data?.imovel?.localizacao?.bairro,
              CEP: response.data?.imovel?.localizacao?.cep,
              Cidade: response.data?.imovel?.localizacao?.cidade,
              Endereco: `${response.data?.imovel?.localizacao?.endereco}, ${response.data?.imovel?.localizacao?.numero}`,
              Estado: response.data?.imovel?.localizacao?.estado,
            },
          },
        };

        const Reajuste = {
          detalhesContrato: {
            reajuste: response.data?.detalhesContrato?.reajuste,
          },
          proprietario: {
            id: response.data?.proprietario?.id,
            nome: response.data?.proprietario?.nome,
            dadoBancarios: response.data?.proprietario?.dadoBancarios?.chavePix,
          },
          inquilino: {
            id: response.data?.inquilino?.id,
            nome: response.data?.inquilino?.nome,
            dadoBancarios: response.data?.inquilino?.dadoBancarios?.chavePix,
          },
        };

        setContractDetails(CampoContrato);
        setReajuste(Reajuste);

    
      } catch (error) {
        console.error("Erro ao buscar detalhes do contrato:", error);
      }
    };

    fetchContractDetails();
  }, [id]);
  
  const handleInfoChange = (key, newValue) => {
    let modifiedData = { 
      ...contractDetails 
    }; 
  
    const mappedKey = keyMapping[key];
    if (mappedKey) {
      const keys = mappedKey.split(".");
  
      if (keys.length === 2) {
        if (!modifiedData[keys[0]]) {
          modifiedData[keys[0]] = {};
        }
        modifiedData[keys[0]][keys[1]] = newValue;
      } else {
        modifiedData[mappedKey] = newValue;
      }
  
      setContractDetails(modifiedData); // Suponho que você tenha um estado chamado 'contractDetails' e uma função 'setContractDetails' para atualizá-lo.
    } else {
      console.warn(`Chave ${key} não encontrada no mapeamento.`);
    }
  };
  const handleSave = async () => {
    try {
      await API_URL.patch(`/contrato-patch/${id}`, contractDetails);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await API_URL.delete(`/contrato-delete/${id}`);

      toast.success("Contrato deletado com sucesso!");

      setTimeout(() => {
        history.push("/admin/obter-contratos");
      }, 2000);
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
      toast.error("Erro ao deletar o imóvel.");
    }
  };

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
                        onClick={handleDelete}
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
                      <Button color="primary" onClick={handleSave}>Salvar</Button>
                    </>
                  )}
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Contrato
                    data={contractDetails}
                    handleInfoChange={handleInfoChange} 
                    isEditing={isEditing}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Despesas despesas={despesasDoMes} />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Reajuste data={reajuste} />
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

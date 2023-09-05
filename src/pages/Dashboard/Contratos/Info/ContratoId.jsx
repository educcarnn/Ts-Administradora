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
import styled from "styled-components"
import fundoContrato from "../../../../assets/Videos/contratos.jpg"

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
  const [isEditable, setIsEditable] = useState(false);

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
              </Box>
  
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Contrato</Typography>
                  {contractDetails.fiador ? (
                    <Input
                      label={getLabel("fiador")}
                      value={contractDetails.fiador || ""}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  ) : (
                    <>
                      {contractDetails.detalhesContrato &&
                        Object.entries(contractDetails.detalhesContrato).map(
                          ([key, value]) => (
                            <Input
                              key={key}
                              label={getLabel(key)}
                              value={value || ""}
                              fullWidth
                              InputProps={{ readOnly: true }}
                            />
                          )
                        )}
                    </>
                  )}
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Garantia</Typography>
                  {contractDetails.garantia &&
                    Object.entries(contractDetails.garantia).map(([key, value]) => (
                      <Input
                        key={key}
                        label={getLabel(key)}
                        value={value || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    ))}
                </Grid>
              </Grid>
  
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Informações do Inquilino</Typography>
                  {contractDetails.inquilino &&
                    ["cpf", "nome", "telefoneCelular"].map((key) => (
                      <Input
                        key={key}
                        label={getLabel(key)}
                        value={contractDetails.inquilino[key] || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Informações do Proprietário</Typography>
                  {contractDetails.proprietario &&
                    ["cpf", "nome", "telefoneCelular"].map((key) => (
                      <Input
                        key={key}
                        label={getLabel(key)}
                        value={contractDetails.proprietario[key] || ""}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    ))}
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

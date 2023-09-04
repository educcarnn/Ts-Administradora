import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Iptu from "./components/Iptu";
import Typography from "@material-ui/core/Typography";
import { API_URL } from "../../../../db/Api";
import { DashboarDiv } from "../style";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Button, Input } from "@mui/material";
import Sidebar from "../../../../components/DashboardComponents/Sidebar";
import fundoImovel from "../../../../assets/Videos/fundoImovel.jpg";
import CaracteristicasConstrucao from "./components/CaracteristicasConstrucao";
import Localizacao from "./components/Localizacao";
import { Card, CardContent, Grid } from "@material-ui/core";
import _ from "lodash";
import Percentual from "./components/Percentual";
import Negociacao from "./components/Negociacao";
import { keyMapping } from "./components/keyMapping";
import { Box, TextField, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "80%",
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

export default function ImovelCaracteristicas() {
  const classes = useStyles();
  const { id } = useParams();
  const [camposCaracteristicas, setCamposCaracteristicas] = useState({});
  const [location, setLocation] = useState({});
  const [imovel, setImovel] = useState(null);
  const [iptu, setIptu] = useState({});
  const [percentual, setPercentual] = useState({});
  const [negociacao, setNegociacao] = useState({});

  const [showAllContratos, setShowAllContratos] = useState(false);
  const [showAllFotos, setShowAllFotos] = useState(false);
  const [imovelInfo, setImovelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const camposCondominio =
    imovelInfo?.tipoCondominio !== "Isento"
      ? {
          CNPJ: imovelInfo?.condominio?.cnpj,
          Site: imovelInfo?.condominio?.site,
          Login: imovelInfo?.condominio?.login,
          Senha: imovelInfo?.condominio?.senha,
          "Razão Social": imovelInfo?.condominio?.razao_social,
        }
      : { Informação: "Isento" };

  const Telefones = {
    "Telefone Celular": imovelInfo?.condominio?.telefone_celular,
    "Telefone Fixo": imovelInfo?.condominio?.telefone_fixo,
  };

  useEffect(() => {
    async function fetchImovelInfo() {
      try {
        const response = await API_URL.get(`/obter-imovel/${id}`);

        const CamposCaracteristicas = {
          TipoImovel: response.data?.tipoImovel,
          caracteristicas: {
            AreaTotal: response.data?.caracteristicas?.areaTotal,
            AreaUtil: response.data?.caracteristicas?.areaUtil,
            NumerodeBanheiros: response.data?.caracteristicas?.numeroBanheiros,
            NumerodeQuartos: response.data?.caracteristicas?.numeroQuartos,
            NumerodeSuites: response.data?.caracteristicas?.numeroSuites,
            TipodeConstrucao: response.data?.caracteristicas?.tipoConstrucao,
          },
        };

        const CamposLocalizacao = {
          Andar: response.data?.localizacao?.andar,
          Bairro: response.data?.localizacao?.bairro,
          CEP: response.data?.localizacao?.cep,
          Cidade: response.data?.localizacao?.cidade,
          Endereço: response.data?.localizacao?.endereco,
          Estado: response.data?.localizacao?.estado,
          Numero: response.data?.localizacao?.numero,
        };

        const CamposIPTU = {
          tipoIptu: response.data?.tipoIptu,
          iptu: {
            ValorMensal: response.data?.iptu?.valorMensal,
            NumerodeMatriculaIPTU: response.data?.iptu?.numero_matricula_iptu,
          },
        };

        const Percentual = {
          Percentual: response.data?.percentual,
        };

        const CamposNegociacao = {
          Tipo: response.data?.negociacao?.tipo,
          valores: {
            "Taxa de Administracao":
              response.data?.negociacao?.valores?.taxaAdministracao,
            "Taxa de Intermediacao":
              response.data?.negociacao?.valores?.taxaIntermediacao,
            "Taxa de Locacao": response.data?.negociacao?.valores?.taxaLocacao,
            "Valor de Aluguel": response.data?.negociacao?.valores?.valorAluguel,
            "Valor de Venda": response.data?.negociacao?.valores?.valorVenda,
            "Valor de Aluguel  - Venda e Aluguel":
              response.data?.negociacao?.valores?.vendaealuguelAluguel,
            "Taxa de Administracao - Venda e Aluguel":
              response.data?.negociacao?.valores?.vendaealuguelTaxa,
            "Valor de Venda  - Venda e Aluguel":
              response.data?.negociacao?.valores?.vendaealuguelVenda,
          },
        };

        setNegociacao(CamposNegociacao);
        setCamposCaracteristicas(CamposCaracteristicas);
        setLocation(CamposLocalizacao);
        setIptu(CamposIPTU);
        setPercentual(Percentual);

        setImovelInfo(response.data);
        setImovel(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar informações do imóvel:", error);
      }
    }

    fetchImovelInfo();
  }, [id]);

  const handleInfoChange = (key, newValue) => {
    const informacoesBasicas = ["ID", "TipoImovel", "GeneroImovel", "TipoIptu"];
    const infoImovel = [
      "AreaTotal",
      "AreaUtil",
      "NumerodeBanheiros",
      "NumerodeQuartos",
      "NumerodeSuites",
      "TipodeConstrucao",
    ];
    const infoLocalizacao = [
      "CEP",
      "Andar",
      "Bairro",
      "Cidade",
      "Estado",
      "Numero",
      "Endereco",
    ];
    const infoIptu = ["ValorMensal", "NumerodeMatriculaIPTU"];
    const infoPercentual = ["Percentual"];
    const infoNegociacao = [
      "Tipo",
      "TaxadeAdministracao",
      "TaxadeIntermediacao",
      "TaxadeLocacao",
      "ValordeAluguel",
      "ValordeVenda",
      "ValordeAluguelVeA",
      "TaxadeAdministracaoVeA",
      "ValordeVendaVeA",
    ];

    if (informacoesBasicas.includes(key)) {
      setCamposCaracteristicas((prevInfo) => ({
        ...prevInfo,
        [key]: newValue,
      }));
    } else if (infoImovel.includes(key)) {
      setCamposCaracteristicas((prevInfo) => ({
        ...prevInfo,
        caracteristicas: {
          ...prevInfo.caracteristicas,
          [key]: newValue,
        },
      }));
    } else if (infoLocalizacao.includes(key)) {
      setLocation((prevInfo) => ({
        ...prevInfo,
        [key]: newValue,
      }));
    } else if (infoIptu.includes(key)) {
      setIptu((prevInfo) => ({
        ...prevInfo,
        iptu: {
          ...prevInfo.iptu,
          [key]: newValue,
        },
      }));
    } else if (infoPercentual.includes(key)) {
      setPercentual((prevInfo) => ({
        ...prevInfo,
        [key]: newValue,
      }));
    } else if (infoNegociacao.includes(key)) {
      setNegociacao((prevInfo) => {
        if (key === "Tipo") {
          return { ...prevInfo, [key]: newValue };
        } else {
          return {
            ...prevInfo,
            valores: { ...prevInfo.valores, [key]: newValue },
          };
        }
      });
    }
  };

  const handleSave = async () => {
    try {
      const allInfo = {
        ...camposCaracteristicas,
        negociacao: negociacao,
        localizacao: location,
        iptu: iptu,
        percentual: percentual,
      };

      const mappedInfo = Object.entries(allInfo).reduce((acc, [key, value]) => {
        const originalKey = keyMapping[key];
        if (originalKey) {
          _.set(acc, originalKey, value);
        }
        return acc;
      }, {});

      await API_URL.patch(`/imovel-patch/${id}`, mappedInfo);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
    }
  };

  const RowContainer = styled.div`
    position: relative;
    overflow: auto;
    z-index: 2;
    background-color: white;
    display: flex;
    flex-direction: row;
    max-width: 100%;
    gap: 5%;
  `;

  return (
    <>
      <DashboarDiv>
        <div> TS Administradora</div>
      </DashboarDiv>
      <Sidebar />
      <ContainerElements
        style={{
          backgroundImage: `url(${fundoImovel})`,
        }}
      >
        <Card className={classes.card}>
          <CardContent>
            {imovel && (
              <>
                <Box marginBottom={2}>
                  <Typography
                    variant="h5"
                    gutterBottom
                  >{`Detalhes do Imóvel #${imovel.id}`}</Typography>
                  <Box marginBottom={2}>
                    {!isEditing ? (
                      <Button
                        color="primary"
                        onClick={() => setIsEditing(true)}
                      >
                        Editar
                      </Button>
                    ) : (
                      <>
                        <Button
                          color="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                        <Button color="primary" onClick={handleSave}>
                          Salvar
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                      Características Construção
                    </Typography>
                    <CaracteristicasConstrucao
                      data={camposCaracteristicas}
                      isEditing={isEditing}
                      handleInfoChange={handleInfoChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <Typography variant="h6">Proprietário</Typography>
                        <Link
                          to={`/admin/obter-usuario/${imovel.proprietario?.id}`}
                        >
                          <Typography>{`${imovel.proprietario?.nome}`}</Typography>
                        </Link>
                        <Percentual
                          data={percentual}
                          isEditing={isEditing}
                          handleInfoChange={handleInfoChange}
                        />
                        <Typography variant="h6">
                          Importantes para Administração (Taxas e Negociacao)
                        </Typography>
                        <Negociacao
                          data={negociacao}
                          isEditing={isEditing}
                          handleInfoChange={handleInfoChange}
                        />

                        <Box marginTop={2} marginBottom={2}>
                          <Typography variant="h6">Status:</Typography>
                          {imovelInfo &&
                            imovelInfo.contratos &&
                            (imovelInfo.contratos.length === 0 ? (
                              <Typography>Disponível para locação</Typography>
                            ) : (
                              <Typography>Locado</Typography>
                            ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">IPTU</Typography>
                    <Iptu
                      data={iptu}
                      isEditing={isEditing}
                      handleInfoChange={handleInfoChange}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button variant="contained" color="primary">
                      Contratos
                    </Button>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Button variant="contained" color="primary">
                      Extrato de Repasse
                    </Button>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Condominio</Typography>
                  {Object.entries(camposCondominio).map(([campo, valor]) => (
                    <div key={campo}>
                      <Input
                        label={campo}
                        value={valor || ""}
                        disabled={!isEditing}
                        margin="normal"
                      />
                    </div>
                  ))}
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Localização</Typography>
                    <Localizacao
                      data={location}
                      isEditing={isEditing}
                      handleInfoChange={handleInfoChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6">Telefones</Typography>
                    {Object.entries(Telefones).map(([campo, valor]) => (
                      <div key={campo}>
                        <Input
                          label={campo}
                          value={valor || ""}
                          disabled={!isEditing}
                          margin="normal"
                        />
                      </div>
                    ))}
                  </Grid>
                </Grid>

                <Box marginTop={2}>
                  <Typography variant="h6">
                    Características do Condomínio:
                  </Typography>
                </Box>
                <Box marginTop={2}>
                  <Typography variant="h6">Características Imóvel: </Typography>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </ContainerElements>
    </>
  );
}

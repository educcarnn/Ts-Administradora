import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Iptu from "../../../Dashboard/Imoveis/ID/components/exemption/Iptu";
import Typography from "@material-ui/core/Typography";
import { API_URL } from "../../../../db/Api";
import { DashboarDiv } from "../../../Dashboard/style";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Button, Input } from "@mui/material";
import SidebarUserJuridica from "../../Sidebar/sidebarUserJur";
import fundoImovel from "../../../../assets/Videos/fundoImovel.jpg";
import CaracteristicasConstrucao from "../../../Dashboard/Imoveis/ID/components/caracteristicas/caracteristicasConstrucao";
import CamposLocalizacao from "../../../Dashboard/Imoveis/ID/components/Localizacao";
import { Card, CardContent, Grid } from "@material-ui/core";
import _, { set } from "lodash";
import AnexosContrato from "../../../Dashboard/Imoveis/ID/components/anexos/anexosContratos";
import Negociacao from "../../../Dashboard/Imoveis/ID/components/negociation/negociacao";

import { Box } from "@material-ui/core";
import CondominioComponente from "../../../Dashboard/Imoveis/ID/components/exemption/Condominio";
import TelefonesComponente from "../../../Dashboard/Imoveis/ID/components/Telefone";
import { useHistory } from "react-router-dom";
import Anuncio from "../../../Dashboard/Imoveis/ID/components/ads";
import AnexosFoto from "../../../Dashboard/Imoveis/ID/components/anexos/anexosFoto";
import AnexosDocumentos from "../../../Dashboard/Imoveis/ID/components/anexos/anexosDocumentos";
import CaracteristicasImovel from "../../../Dashboard/Imoveis/ID/components/caracteristicas/caracteristicasImovel";
import CheckboxCaracteristicasCondominio from "../../../Dashboard/Imoveis/ID/components/caracteristicas/caracteristicasCondominio";
import ProprietariosComponent from "../../../Dashboard/Imoveis/ID/components/others/proprietario";
import StatusImovel from "../../../Dashboard/Imoveis/ID/components/others/inquilino";

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
  const history = useHistory();

  const [imovel, setImovel] = useState(null);

  const [telefone, setTelefone] = useState([]);

  const [camposLocalizacao, setCamposLocalizacao] = useState({});
  const [camposCaracteristicas, setCamposCaracteristicas] = useState({});

  const [showContratos, setShowContratos] = useState(false);
  const [imovelInfo, setImovelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const toggleContratos = () => {
    setShowContratos((prevState) => !prevState);
  };
  const [contratos, setContratos] = useState([]);
  const [anuncios, setAnuncios] = useState([]);
  const [anexos, setAnexos] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [tipoImovel, setTipoImovel] = useState([]);
  const [caracteristicasImovel, setCaracteristicasImovel] = useState([]);
  const [caracteristicasCondominio, setCaracteristicasCondominio] = useState(
    []
  );
  const [tipoNegociacao, setTipoNegociacao] = useState([]);
  const [negociacao, setNegociacao] = useState([]);

  const [camposIptu, setCamposIptu] = useState([]);
  const [camposCondominio, setCamposCondominio] = useState([]);
  const [tipoIptu, setTipoIptu] = useState([]);
  const [tipoCondominio, setTipoCondominio] = useState([]);
  const [proprietarios, setProprietarios] = useState([]);
  const [submit, setSubmit] = useState(false);

  const handleInfoChangeAds = (campo, newValue) => {
    setAnuncios((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleLocalizacao = (campo, newValue) => {
    setCamposLocalizacao((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleCaracteristicasImovel = (caracteristica, isChecked) => {
    setCaracteristicasImovel((prevState) => {
      const novoEstado = {
        ...prevState,
        caracteristicas_imovel: isChecked
          ? [...prevState.caracteristicas_imovel, caracteristica]
          : prevState.caracteristicas_imovel.filter(
              (item) => item !== caracteristica
            ),
      };
      return novoEstado;
    });
  };

  const handleCaracteristicasCondominio = (caracteristica, isChecked) => {
    setCaracteristicasCondominio((prevState) => {
      const novoEstado = {
        ...prevState,
        caracteristicas_condominio: isChecked
          ? [...prevState.caracteristicas_condominio, caracteristica]
          : prevState.caracteristicas_condominio.filter(
              (item) => item !== caracteristica
            ),
      };
      return novoEstado;
    });
  };

  const handleTipoImovel = (newValue) => {
    setTipoImovel((prevState) => {
      return {
        ...prevState,
        tipoImovel: newValue,
      };
    });
  };

  const handleCaracteristicasCampo = (campo, newValue) => {
    setCamposCaracteristicas((prevState) => ({
      ...prevState,
      [campo]: newValue,
    }));
  };

  const handleTipoNegociacao = (newValue) => {
    setTipoNegociacao((prevState) => ({
      ...prevState,
      tipo: newValue,
    }));
  };

  const handleNegociacao = (campo, valor) => {
    setNegociacao((prevState) => {
      return {
        ...prevState,
        valores: {
          ...prevState.valores,
          [campo]: valor,
        },
      };
    });
  };

  const handleTipoIptu = (newValue) => {
    setTipoIptu((prevState) => ({
      ...prevState,
      tipoIptu: newValue,
    }));
  };

  const handleIptuChange = (campo, valor) => {
    setCamposIptu((prevState) => {
      return {
        ...prevState,
        iptu: {
          ...prevState.iptu,
          [campo]: valor,
        },
      };
    });
  };

  const handleTipoCondominio = (newValue) => {
    setTipoCondominio((prevState) => {
      return {
        ...prevState,
        tipoCondominio: newValue,
      };
    });
  };

  const handleCondominioChange = (campo, valor) => {
    setCamposCondominio((prevState) => {
      return {
        ...prevState,
        [campo]: valor,
      };
    });
  };

  const handleTelefoneChange = (campo, valor) => {
    setTelefone((prevState) => {
      return {
        ...prevState,
        [campo]: valor,
      };
    });
  };

  useEffect(() => {
    async function fetchImovelInfo() {
      try {
        const response = await API_URL.get(`/obter-imovel/${id}`);

        setAnuncios({
          Título: response?.data?.anuncio?.title,
          Descrição: response?.data?.anuncio?.description,
          Contrato: response?.data?.anuncio?.contrato,
        });

        setAnexos({
          idImovel: response.data.id,
          listaAnexos: response.data.anexos.map((anexo) => ({
            ...anexo,
            idImovel: id,
          })),
        });

        setFotos({
          idImovel: response.data.id,
          listaFotos: response.data.fotos.map((foto) => ({
            ...foto,
            idImovel: id,
          })),
        });

        setContratos({
          idImovel: response.data.id,
          listaContratos: response.data.servicos.map((contrato) => ({
            ...contrato,
            idImovel: id,
          })),
        });

        setCaracteristicasImovel({
          caracteristicas_imovel: response.data?.caracteristicas_imovel,
        });

        setCaracteristicasCondominio({
          caracteristicas_condominio: response.data?.caracteristicas_condominio,
        });

        setTipoNegociacao({
          tipo: response.data?.negociacao?.tipo,
        });

        setTipoImovel({
          tipoImovel: response.data?.tipoImovel,
        });

        setCamposCaracteristicas({
          areaTotal: response.data?.caracteristicas?.areaTotal,
          areaUtil: response.data?.caracteristicas?.areaUtil,
          numeroBanheiros: response.data?.caracteristicas?.numeroBanheiros,
          numeroQuartos: response.data?.caracteristicas?.numeroQuartos,
          numeroVagas: response.data?.caracteristicas?.numeroVagas,
          numeroSuites: response.data?.caracteristicas?.numeroSuites,
          tipoConstrucao: response.data?.caracteristicas?.tipoConstrucao,
        });

        setTipoCondominio({
          tipoCondominio: response.data?.tipoCondominio,
        });

        setCamposCondominio({
          cnpj: response.data?.condominio?.cnpj,
          site: response.data?.condominio?.site,
          login: response.data?.condominio?.login,
          nome_condominio: response.data?.condominio.nome_condominio,
          nome_administradora: response.data?.condominio.nome_administradora,
          valor_mensal: response.data?.condominio.valor_mensal,
          senha: response.data?.condominio?.senha,
          razao_social: response.data?.condominio?.razao_social,
        });

        setTelefone({
          telefone_celular: response.data?.condominio?.telefone_celular,
          telefone_fixo: response.data?.condominio?.telefone_fixo,
        });

        setCamposLocalizacao({
          Complemento: response.data?.localizacao?.andar,
          Bairro: response.data?.localizacao?.bairro,
          CEP: response.data?.localizacao?.cep,
          Cidade: response.data?.localizacao?.cidade,
          endereco: response.data?.localizacao?.endereco,
          Estado: response.data?.localizacao?.estado,
          Numero: response.data?.localizacao?.numero,
        });

        setCamposIptu({
          iptu: {
            valorMensal: response.data?.iptu?.valorMensal,
            numero_matricula_iptu: response.data?.iptu?.numero_matricula_iptu,
          },
        });

        setTipoIptu({
          tipoIptu: response.data?.tipoIptu,
        });
        setProprietarios({
          imoveisProprietarios: response.data?.imoveisProprietarios,
        });

        setNegociacao({
          valores: {
            taxaAdministracao:
              response.data?.negociacao?.valores?.taxaAdministracao,
            taxaIntermediacao:
              response.data?.negociacao?.valores?.taxaIntermediacao,
            taxaLocacao: response.data?.negociacao?.valores?.taxaLocacao,
            valorAluguel: response.data?.negociacao?.valores?.valorAluguel,
            valorVenda: response.data?.negociacao?.valores?.valorVenda,
            vendaealuguelAluguel:
              response.data?.negociacao?.valores?.vendaealuguelAluguel,
            vendaealuguelTaxa:
              response.data?.negociacao?.valores?.vendaealuguelTaxa,
            vendaealuguelVenda:
              response.data?.negociacao?.valores?.vendaealuguelVenda,
          },
        });

        setImovelInfo(response.data);

        setImovel(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar informações do imóvel:", error);
      }
    }

    fetchImovelInfo();
  }, [id]);

  const handleSave = async () => {
    try {
      const anuncioData = {
        title: anuncios.Título,
        description: anuncios.Descrição,
      };

      const localizacaoData = {
        cep: camposLocalizacao.CEP,
        andar: camposLocalizacao.Complemento,
        bairro: camposLocalizacao.Bairro,
        cidade: camposLocalizacao.Cidade,
        estado: camposLocalizacao.Estado,
        endereco: camposLocalizacao.endereco,
        numero: camposLocalizacao.Numero,
      };

      const caracteristicasData = {
        areaTotal: camposCaracteristicas.areaTotal,
        areaUtil: camposCaracteristicas.areaUtil,
        numeroBanheiros: camposCaracteristicas.numeroBanheiros,
        numeroQuartos: camposCaracteristicas.numeroQuartos,
        numeroVagas: camposCaracteristicas.numeroVagas,
        numeroSuites: camposCaracteristicas.numeroSuites,
        tipoConstrucao: camposCaracteristicas.tipoConstrucao,
      };

      const negociacaoData = {
        tipo: tipoNegociacao.tipo,
        valores: negociacao.valores,
      };

      const condominioData = {
        ...camposCondominio,
        ...telefone,
      };

      const allInfo = {
        negociacao: negociacaoData,
        tipoImovel: tipoImovel.tipoImovel,
        tipoCondominio: tipoCondominio.tipoCondominio,
        tipoIptu: tipoIptu.tipoIptu,
        caracteristicas_imovel: caracteristicasImovel.caracteristicas_imovel,
        caracteristicas_condominio:
          caracteristicasCondominio.caracteristicas_condominio,
        caracteristicas: caracteristicasData,
        localizacao: localizacaoData,
        condominio: condominioData,
        iptu: camposIptu.iptu,
        anuncio: anuncioData,
      };

      await API_URL.patch(`/imovel-patch/${id}`, allInfo);
      setSubmit(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar as informações:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await API_URL.delete(`/imovel-delete/${id}`);

      toast.success("Imóvel deletado com sucesso!");

      setTimeout(() => {
        history.push("/admin/imoveis-cadastrados");
      }, 2000);
    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
      toast.error("Erro ao deletar o imóvel.");
    }
  };

  return (
    <>
      <DashboarDiv>TS Administradora - Imóvel</DashboarDiv>
      <SidebarUserJuridica />
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
                      camposCaracteristicas={camposCaracteristicas}
                      handleTipoImovel={handleTipoImovel}
                      tipoImovel={tipoImovel}
                      isEditing={isEditing}
                      handleCaracteristicasCampo={handleCaracteristicasCampo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12}>
                        <ProprietariosComponent
                          proprietarios={proprietarios}
                          setProprietarios={proprietarios}
                          submit={submit}
                          setSubmit={setSubmit}
                          isEditing={isEditing}
                        />
                        <Typography variant="h6">
                          Importantes para Administração (Taxas e Negociação)
                        </Typography>
                        <Negociacao
                          negociacao={negociacao}
                          handleTipoNegociacao={handleTipoNegociacao}
                          isEditing={isEditing}
                          tipo={tipoNegociacao}
                          handleNegociacao={handleNegociacao}
                        />

                        <StatusImovel
                          imovelInfo={imovelInfo}
                          isEditing={isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">IPTU</Typography>
                    <Iptu
                      tipoIptu={tipoIptu}
                      iptu={camposIptu}
                      isEditing={isEditing}
                      handleIptuChange={handleIptuChange}
                      handleTipoIptu={handleTipoIptu}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={toggleContratos}
                    >
                      Contratos
                    </Button>

                    {showContratos &&
                      (imovel.contratos && imovel.contratos.length > 0 ? (
                        <div>
                          <ul>
                            {imovel.contratos.map((contrato) => (
                              <li key={contrato.id}>
                                <Link
                                  to={`/admin/obter-contrato-novo/${contrato.id}`}
                                >
                                  Contrato ID: {contrato.id} - Valor: R$
                                  {contrato.detalhesContrato.valor}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div>Não há contratos vinculados a este imóvel.</div>
                      ))}
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Button variant="contained" color="primary">
                      Extrato de Repasse
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Condomínio</Typography>
                    <CondominioComponente
                      condominio={camposCondominio}
                      handleTipoCondominio={handleTipoCondominio}
                      tipoCondominio={tipoCondominio}
                      isEditing={isEditing}
                      handleCondominioChange={handleCondominioChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Anuncio
                      anuncios={anuncios}
                      isEditing={isEditing}
                      handleInfoChangeAds={handleInfoChangeAds}
                    />
                    <AnexosDocumentos anexos={anexos} />
                    <AnexosContrato contratos={contratos} />
                    <AnexosFoto fotos={fotos} />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Localização</Typography>
                    <CamposLocalizacao
                      isEditing={isEditing}
                      camposLocalizacao={camposLocalizacao}
                      handleInfoChange={handleLocalizacao}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TelefonesComponente
                      telefone={telefone}
                      isEditing={isEditing}
                      handleTelefoneChange={handleTelefoneChange}
                    />
                  </Grid>
                </Grid>

                <CaracteristicasImovel
                  caracteristicasImovel={caracteristicasImovel}
                  isEditing={isEditing}
                  handleCaracteristicasImovel={handleCaracteristicasImovel}
                />
                <CheckboxCaracteristicasCondominio
                  handleCaracteristicasCondominio={
                    handleCaracteristicasCondominio
                  }
                  isEditing={isEditing}
                  caracteristicasCondominio={caracteristicasCondominio}
                />
              </>
            )}
          </CardContent>
        </Card>
      </ContainerElements>
    </>
  );
}

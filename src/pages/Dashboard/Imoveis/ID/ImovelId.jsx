import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { API_URL } from "../../../../db/Api";
import { DashboarDiv } from "../style";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Button, Input } from "@mui/material";
import Sidebar from "../../../../components/DashboardComponents/Sidebar";
import axios from "axios";
import { ColumnContainer } from "../style";
import imovelVideo from "../../../../assets/Videos/imovel.mp4";
import CaracteristicasConstrucao from "./components/CaracteristicasConstrucao";
import Localizacao from "./components/Localizacao";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row", // Alterado para exibir em formato de linha
    maxWidth: "100%",
    padding: theme.spacing(2),
    boxShadow: "none",
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

export default function ImovelCaracteristicas() {
  const classes = useStyles();
  const { id } = useParams();

  const [imovel, setImovel] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAllContratos, setShowAllContratos] = useState(false);
  const [showAllFotos, setShowAllFotos] = useState(false);
  const [imovelInfo, setImovelInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const camposCaracteristicas = {
    "Tipo Imóvel": imovelInfo?.tipoImovel,
    "Área Total": imovelInfo?.caracteristicas?.areaTotal,
    "Área Útil": imovelInfo?.caracteristicas?.areaUtil,
    "Número de Banheiros": imovelInfo?.caracteristicas?.numeroBanheiros,
    "Número de Quartos": imovelInfo?.caracteristicas?.numeroQuartos,
    "Número de Suítes": imovelInfo?.caracteristicas?.numeroSuites,
    "Número de Vagas": imovelInfo?.caracteristicas?.numeroVagas,
    "Tipo de Construção": imovelInfo?.caracteristicas?.tipoConstrucao,
  };

  const camposLocalizacao = {
    Andar: imovelInfo?.localizacao?.andar,
    Bairro: imovelInfo?.localizacao?.bairro,
    CEP: imovelInfo?.localizacao?.cep,
    Cidade: imovelInfo?.localizacao?.cidade,
    Endereço: imovelInfo?.localizacao?.endereco,
    Estado: imovelInfo?.localizacao?.estado,
    Número: imovelInfo?.localizacao?.numero,
  };

  const camposNegociacao = {
    Tipo: imovelInfo?.negociacao?.tipo,
    "Taxa de Administração": imovelInfo?.negociacao?.valores.taxaAdministracao,
    "Taxa de Intermediação": imovelInfo?.negociacao?.valores.taxaIntermediacao,
    "Taxa de Locação": imovelInfo?.negociacao?.valores?.taxaLocacao,
    "Valor de Aluguel": imovelInfo?.negociacao?.valores?.valorAluguel,
    "Valor de Venda": imovelInfo?.negociacao?.valores?.valorVenda,
    Aluguel: imovelInfo?.negociacao?.valores?.vendaealuguelAluguel,
    "Taxa de Administração": imovelInfo?.negociacao?.valores?.vendaealuguelTaxa,
    Venda: imovelInfo?.negociacao?.valores?.vendaealuguelVenda,
  };

  const Proprietario = {
    Percentual: imovelInfo?.percentual,
  };

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

  const camposIPTU = {
    "Valor Mensal": imovelInfo?.iptu?.valorMensal,
    "Número de Matrícula IPTU": imovelInfo?.iptu?.numero_matricula_iptu,
  };
  const Telefones = {
    "Telefone Celular": imovelInfo?.condominio?.telefone_celular,
    "Telefone Fixo": imovelInfo?.condominio?.telefone_fixo,
  };

  useEffect(() => {
    async function fetchImovelInfo() {
      try {
        const response = await API_URL.get(`/obter-imovel/${id}`);
        setImovelInfo(response.data);
        setImovel(response.data);
        setIsLoading(false);

        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar informações do imóvel:", error);
      }
    }

    fetchImovelInfo();
  }, [id]);
const handleInputChange = (section, campo, event) => {
  const newValue = event.target.value;

  setImovelInfo(prevState => {
    let updatedState = {...prevState};
    if(!updatedState[section]) {
      updatedState[section] = {};
    }
    updatedState[section][campo] = newValue;
    return updatedState;
  });
};
  const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 100%;
    gap: 5%;
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5%;
  `;

  const videoStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    minWidth: "100%",
    minHeight: "100%",
  };

  const ContainerElements = styled.div`
    z-index: 2;
    background-color: white;
    position: relative;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}/atualizar-imovel/${id}`,
        imovelInfo
      );
      if (response.status === 200) {
        alert("Dados atualizados com sucesso!");
      } else {
        alert("Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      alert("Erro ao atualizar dados.");
    }
    setIsEditing(false);
  };

  return (
    <>
      <DashboarDiv>TS Administradora</DashboarDiv>
      <Sidebar />
      <video autoPlay loop muted style={videoStyle}>
        <source src={imovelVideo} type="video/mp4" />
      </video>
      <Container>
        <ContainerElements>
          <RowContainer>
            <Button
              onClick={() => {
                if (isEditing) {
                  handleUpdate();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Confirmar" : "Editar"}
            </Button>
          </RowContainer>
          {imovel && (
            <div>
              <Typography
                className={classes.title}
              >{`Detalhes do Imóvel #${imovel.id}`}</Typography>
              <Card className={classes.card}>
                <CardContent className={classes.section}>
                  <Typography variant="h6">
                    Características Construção
                  </Typography>
                  <CaracteristicasConstrucao
                    data={camposCaracteristicas}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                  />
                </CardContent>

                <CardContent className={classes.section}>
                  <Typography variant="h6">Localização</Typography>
                  <Localizacao data={camposLocalizacao} isEditing={isEditing} />
                </CardContent>

                <CardContent className={classes.section}>
                  <Typography variant="h6">IPTU</Typography>
                  {imovelInfo?.iptu?.valorMensal === 0 ||
                  !imovelInfo?.iptu?.valorMensal ? (
                    <Typography>Isento</Typography>
                  ) : (
                    Object.entries(camposIPTU).map(([campo, valor]) => (
                      <div key={campo}>
                        <ColumnContainer>
                          <label>{campo}:</label>
                          <Input
                            type="text"
                            value={valor || ""}
                            readOnly={!isEditing}
                          />
                        </ColumnContainer>
                      </div>
                    ))
                  )}
                </CardContent>
                <CardContent className={classes.section}>
                  <Typography variant="h6">Proprietário</Typography>
                  <ul className={classes.peopleList}>
                    <li
                      key={imovel.proprietario.id}
                      className={classes.personItem}
                    >
                      <Link
                        to={`/obter-usuario/${imovel.proprietario?.id}`}
                        className={classes.link}
                      >
                        <Typography>{`${imovel.proprietario?.nome}`}</Typography>
                      </Link>
                    </li>
                    {Object.entries(Proprietario).map(([campo, valor]) => (
                      <div key={campo}>
                        <ColumnContainer>
                          <label>{campo}:</label>
                          <Input
                            type="text"
                            value={valor || ""}
                            readOnly={!isEditing}
                          />
                        </ColumnContainer>
                      </div>
                    ))}
                  </ul>

                  <Typography variant="h6">
                    Importantes para Administração (Taxas e Negociacao)
                  </Typography>
                  {Object.entries(camposNegociacao)
                    .filter(([, valor]) => valor && valor !== 0) // Este filtro irá remover campos nulos ou zerados
                    .map(([campo, valor]) => {
                      // Se o campo é "Tipo" e o valor é "duasopcoes"
                      if (campo === "Tipo" && valor === "duasopcoes") {
                        valor = "Venda e Aluguel";
                      }
                      return (
                        <div key={campo}>
                          <ColumnContainer>
                            <label>{campo}:</label>
                            <Input
                              type="text"
                              value={valor.toString() || ""}
                              readOnly={!isEditing}
                            />
                          </ColumnContainer>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
              <RowContainer>
                <CardContent className={classes.section}>
                  <Typography variant="h6">Condominio</Typography>
                  {Object.entries(camposCondominio).map(([campo, valor]) => (
                    <div key={campo}>
                      <ColumnContainer>
                        <label>{campo}:</label>
                        <Input
                          type="text"
                          value={valor || ""}
                          readOnly={!isEditing}
                        />
                      </ColumnContainer>
                    </div>
                  ))}
                  <RowContainer>
                    {Object.entries(Telefones).map(([campo, valor]) => (
                      <div key={campo}>
                        <label>{campo}:</label>
                        <Input
                          type="text"
                          value={valor || ""}
                          readOnly={!isEditing}
                        />
                      </div>
                    ))}
                  </RowContainer>
                </CardContent>
                <CardContent className={classes.section}>
                  <Typography variant="h6">Status:</Typography>
                  <label>
                    {imovelInfo &&
                      imovelInfo.contratos &&
                      (imovelInfo.contratos.length === 0 ? (
                        <Typography>Disponível para locação</Typography>
                      ) : (
                        <Typography>Locado</Typography>
                      ))}
                  </label>
                </CardContent>
                <CardContent className={classes.section}>
                  <Typography variant="h6">
                    Características do Condomínio:
                  </Typography>
                </CardContent>
                <CardContent className={classes.section}>
                  <Typography variant="h6">Características Imóvel: </Typography>
                </CardContent>
              </RowContainer>
            </div>
          )}
          <RowContainer>
            <Button>Contratos</Button>
            <Button>Extrato de Repasse</Button>
          </RowContainer>
        </ContainerElements>
      </Container>
    </>
  );
}

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
import { Link } from "react-router-dom";
import { RowContainer } from "../../style";
import { keyMapping } from "./components/keyMapping";
import DadosCadastro from "./components/dadosCadastro";
import Filiacao from "./components/filiacao";
import MoreInformations from "./components/moreInformations";
import Telefones from "./components/telefones";
import Endereco from "./components/camposEndereco";
import DadosBancarios from "./components/dadosBancarios";
import _ from "lodash";
import background from "../../../../assets/Videos/fundoClientes.png";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { RowItems } from "../../style";

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
    boxSizing: "border-box",
    '@media (max-width: 800px)': { 

      overflow: 'auto !important',
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
  const [showUltimosContratos, setShowUltimosContratos] = useState(false);
  const [showExtratoRepasse, setShowExtratoRepasse] = useState(false);
  const [showListaEmails, setShowListaEmails] = useState(false);
  const [showImoveis, setShowImoveis] = useState(false);
  const [showContratos, setShowContratos] = useState(false);

  const [dadosBancarios, setDadosBancarios] = useState({});
  const [camposEndereco, setCamposEndereco] = useState({});
  const [phones, setPhones] = useState({});
  const [info, setInfo] = useState({});
  const [filiacao, setFiliacao] = useState({});
  const [moreInformations, setMoreInformations] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleShowUltimosContratos = () => {
    setShowUltimosContratos(true);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleShowContratoProprietario = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(true);
  };

  const handleShowExtratoRepasse = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(true);
    setShowListaEmails(false);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleShowListaEmails = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(true);
    setShowImoveis(false);
    setShowContratos(false);
  };

  const handleMostrarImoveis = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
    setShowImoveis(true);
    setShowContratos(false);
  };

  useEffect(() => {
    async function fetchPessoaInfo() {
      try {
        const response = await API_URL.get(`/pessoa/${id}`);
        setPessoaInfo(response.data);

        const leftInfoFields = {
          ID: id,
          Tipo: response.data.tipo,
          Função: Array.isArray(response.data.funcao)
            ? response.data.funcao.join(", ")
            : response.data.funcao,
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
          "E-mail": response.data?.email,
        };

        const Telefones = {
          "Telefone Fixo": response.data?.telefoneFixo,
          "Telefone Celular": response.data?.telefoneCelular,
        };

        const CamposEndereco = {
          Bairro: response.data?.endereco?.bairro,
          CEP: response.data?.endereco?.cep,
          Cidade: response.data?.endereco?.cidade,
          Endereco: response.data?.endereco?.endereco,
          Estado: response.data?.endereco?.estado,
        };

        const DadosBancarios = {
          Banco: response.data?.dadoBancarios?.banco,
          Conta: response.data?.dadoBancarios?.conta,
          Agencia: response.data?.dadoBancarios?.agencia,
          ChavePix: response.data?.dadoBancarios?.chavePix,
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
        <CircularProgress /> {/* Indicador de carregamento */}
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
        ...info,
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
      console.log(mappedInfo);
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
                <Endereco
                  addressData={camposEndereco}
                  handleInfoChange={handleInfoChange}
                  isEditing={isEditing}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <RowContainer>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowUltimosContratos}
            >
              Contratos sendo Locatário
            </Button>
            {showUltimosContratos &&
              (pessoaInfo.contratosInquilinos.length > 0 ? (
                <div>
                  <div>Últimos Contratos:</div>
                  <ul>
                    {pessoaInfo.contratosInquilinos.map((contrato) => (
                      <li key={contrato.id}>
                        <Link to={`/caminhoParaContrato/${contrato.id}`}>
                          {contrato.nomeDoContrato}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>Não há contratos vinculados como Locatário.</div>
              ))}
          </Box>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowContratoProprietario}
            >
              Contratos sendo Proprietário
            </Button>
            {showContratos &&
              (pessoaInfo.contratosProprietarios.length > 0 ? (
                <div>
                  <div>Últimos Contratos:</div>
                  <ul>
                    {pessoaInfo.contratosProprietarios.map((contrato) => (
                      <li key={contrato.id}>
                        <Link to={`/caminhoParaContrato/${contrato.id}`}>
                          {contrato.nomeDoContrato}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>Não há contratos vinculados como Proprietário.</div>
              ))}
          </Box>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleMostrarImoveis}
            >
              Propriedades
            </Button>
            {showImoveis && (
              <div>
                <div>
                  {pessoaInfo.imoveisProprietarios.map((imovel) => (
                    <Link key={imovel.id} to={`/imovel/${imovel.id}`}>
                      <Typography variant="body2">
                        {imovel.id} - {imovel.generoImovel} no{" "}
                        {imovel.localizacao.bairro},{" "}
                        {imovel.localizacao.endereco} N{" "}
                        {imovel.localizacao.numero} CEP:{" "}
                        {imovel.localizacao.cep}
                      </Typography>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Box>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowExtratoRepasse}
            >
              Extrato de Repasse
            </Button>
            {showExtratoRepasse && <div>Extrato de repasse</div>}
          </Box>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowListaEmails}
            >
              Lista de E-mails
            </Button>
            {showListaEmails && <div>Lista de e-mails</div>}
          </Box>
        </RowContainer>
      </ContainerElements>
    </>
  );
}

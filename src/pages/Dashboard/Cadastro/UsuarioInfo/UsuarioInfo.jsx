import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Button,
  Box,
  Input,
} from "@mui/material";
import { DashboarDiv } from "../../style";
import { API_URL } from "../../../../db/Api";
import Sidebar from "../../../../components/DashboardComponents/Sidebar";
import { Link } from "react-router-dom";
import { RowContainer } from "../../style";
import { ColumnContainer } from "../../Imoveis/style";

export default function UsuarioInfo() {
  const { id } = useParams();
  const [pessoaInfo, setPessoaInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showUltimosContratos, setShowUltimosContratos] = useState(false);
  const [showExtratoRepasse, setShowExtratoRepasse] = useState(false);
  const [showListaEmails, setShowListaEmails] = useState(false);
  const [showImoveis, setShowImoveis] = useState(false);
  const [showContratos, setShowContratos] = useState(false);
  const [imoveis, setImoveis] = useState([]);

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
        const response = await axios.get(`${API_URL}/pessoa/${id}`);
        setPessoaInfo(response.data);

        console.log(response);
        setIsLoading(false); // Defina o isLoading como false após o carregamento dos dados
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

  const leftInfoFields = {
    ID: id,
    Tipo: pessoaInfo.tipo,
    Função: Array.isArray(pessoaInfo.funcao)
      ? pessoaInfo.funcao.join(", ")
      : pessoaInfo.funcao,
    Nome: pessoaInfo.nome,
    CPF: pessoaInfo.cpf,
    Identidade: pessoaInfo.identidade,
  };

  const rightInfoFields = {
    "Órgão Expedidor": pessoaInfo.orgaoExpedidor,
    "Data de Nascimento": new Date(
      pessoaInfo.dataNascimento
    ).toLocaleDateString(),
    Profissão: pessoaInfo.profissao,
    "Estado Civil": pessoaInfo.estadoCivil,
    Nacionalidade: pessoaInfo.nacionalidade,

    "E-mail": pessoaInfo.email,
  };

  const camposEndereco = {
    Bairro: pessoaInfo.endereco.bairro,
    CEP: pessoaInfo.endereco.cep,
    Cidade: pessoaInfo.endereco.cidade,
    Endereço: pessoaInfo.endereco.endereco,
    Estado: pessoaInfo.endereco.estado,
  };

  const Filiacao = {
    "Filiação (Mãe)": pessoaInfo.filiacao.mae,
    "Filiação (Pai)": pessoaInfo.filiacao.pai,
  };

  const Telefones = {
    "Telefone Fixo": pessoaInfo.telefoneFixo,
    "Telefone Celular": pessoaInfo.telefoneCelular,
  };
  const dadosBancarios = {
    Banco: pessoaInfo?.dadoBancarios?.banco,
    Conta: pessoaInfo?.dadoBancarios?.conta,
    Agência: pessoaInfo?.dadoBancarios?.agencia,
    "Chave Pix": pessoaInfo?.dadoBancarios?.chavePix,
  };

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora</div>
      </DashboarDiv>
      <Sidebar />
      {console.log(pessoaInfo)}
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
                  <Link
                    key={imovel.id}
                    to={`/imovel/${imovel.id}`} // Substitua pelo caminho correto da página de detalhes do imóvel
                    /* style={{ textDecoration: "none", color: "inherit" }}*/
                  >
                    <Typography variant="body2">
                      {imovel.id} - {imovel.generoImovel} no{" "}
                      {imovel.localizacao.bairro}, {imovel.localizacao.endereco}{" "}
                      N {imovel.localizacao.numero} CEP:{" "}
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
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Informações de {pessoaInfo.nome}
          </Typography>{" "}
          <Divider />
          <Typography variant="h6" gutterBottom>
            Dados de Cadastro
          </Typography>{" "}
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              {Object.entries(leftInfoFields).map(([key, value]) => (
                <ColumnContainer variant="body2" key={key}>
                  <strong>{key}:</strong> <Input value={value} />
                </ColumnContainer>
              ))}
              <RowContainer item xs={12} sm={6}>
                {Object.entries(Filiacao).map(([key, value]) => (
                  <div>
                    <ColumnContainer variant="body2" key={key}>
                      <strong>{key}:</strong> <Input value={value} />
                    </ColumnContainer>
                  </div>
                ))}
              </RowContainer>
            </Grid>

            <Grid item xs={12} sm={6}>
              {Object.entries(rightInfoFields).map(([key, value]) => (
                <ColumnContainer variant="body2" key={key}>
                  <strong>{key}:</strong> <Input value={value} />
                </ColumnContainer>
              ))}
              <RowContainer item xs={12} sm={6}>
                {Object.entries(Telefones).map(([key, value]) => (
                  <div>
                    <ColumnContainer variant="body2" key={key}>
                      <strong>{key}:</strong> <Input value={value} />
                    </ColumnContainer>
                  </div>
                ))}
              </RowContainer>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Forma de pagamento
              </Typography>
              {dadosBancarios &&
                Object.entries(dadosBancarios).map(([key, value]) => {
                  if (value) {
                    let label;
                    switch (key) {
                      case "banco":
                        label = "Banco";
                        break;
                      case "conta":
                        label = "Conta";
                        break;
                      case "agencia":
                        label = "Agência";
                        break;
                      case "chavePix":
                        label = "Chave Pix";
                        break;
                      default:
                        label = key;
                    }
                    return (
                      <Typography variant="body2" key={key}>
                        <strong>{label}:</strong> {value}
                      </Typography>
                    );
                  }
                  return null;
                })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>
              {Object.entries(camposEndereco).map(([chave, valor]) => (
                <ColumnContainer variant="body2" key={chave}>
                  <strong>{chave}:</strong> <Input value={valor} />
                </ColumnContainer>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

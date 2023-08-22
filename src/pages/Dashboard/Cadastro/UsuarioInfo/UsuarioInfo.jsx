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
} from "@mui/material";
import { DashboarDiv } from "../../style";
import { API_URL } from "../../../../db/Api";

export default function UsuarioInfo() {
  const { id } = useParams();
  const [pessoaInfo, setPessoaInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showUltimosContratos, setShowUltimosContratos] = useState(false);
  const [showExtratoRepasse, setShowExtratoRepasse] = useState(false);
  const [showListaEmails, setShowListaEmails] = useState(false);

  const handleShowUltimosContratos = () => {
    setShowUltimosContratos(true);
    setShowExtratoRepasse(false);
    setShowListaEmails(false);
  };

  const handleShowExtratoRepasse = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(true);
    setShowListaEmails(false);
  };

  const handleShowListaEmails = () => {
    setShowUltimosContratos(false);
    setShowExtratoRepasse(false);
    setShowListaEmails(true);
  };

  useEffect(() => {
    async function fetchPessoaInfo() {
      try {
        const response = await axios.get(`${API_URL}/pessoa/${id}`);
        setPessoaInfo(response.data);
        setIsLoading(false); // Defina o isLoading como false após o carregamento dos dados
      } catch (error) {
        console.error("Erro ao buscar informações da pessoa:", error);
      }
    }

    fetchPessoaInfo(); // Chama a função para buscar as informações da pessoa
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

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora</div>
      </DashboarDiv>
      {console.log(pessoaInfo)}
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
              <Typography variant="body2">
                <strong>ID:</strong> {id}
              </Typography>
              <Typography variant="body2">
                <strong>Tipo:</strong> {pessoaInfo.tipo}
              </Typography>
              <Typography variant="body2">
                <strong>Função:</strong>{" "}
                {Array.isArray(pessoaInfo.funcao)
                  ? pessoaInfo.funcao.join(", ")
                  : pessoaInfo.funcao}
              </Typography>
              <Typography variant="body2">
                <strong>Nome:</strong> {pessoaInfo.nome}
              </Typography>
              <Typography variant="body2">
                <strong>CPF:</strong> {pessoaInfo.cpf}
              </Typography>
              <Typography variant="body2">
                <strong>Identidade:</strong> {pessoaInfo.identidade}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">
                <strong>Órgão Expedidor:</strong> {pessoaInfo.orgaoExpedidor}
              </Typography>
              <Typography variant="body2">
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(pessoaInfo.dataNascimento).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                <strong>Profissão:</strong> {pessoaInfo.profissao}
              </Typography>
              <Typography variant="body2">
                <strong>Estado Civil:</strong> {pessoaInfo.estadoCivil}
              </Typography>
              <Typography variant="body2">
                <strong>Filiação (Mãe):</strong> {pessoaInfo.filiacao.mae}
              </Typography>
              <Typography variant="body2">
                <strong>Filiação (Pai):</strong> {pessoaInfo.filiacao.pai}
              </Typography>
              <Typography variant="body2">
                <strong>Nacionalidade:</strong> {pessoaInfo.nacionalidade}
              </Typography>
              <Typography variant="body2">
                <strong>Telefone Fixo:</strong> {pessoaInfo.telefoneFixo}
              </Typography>
              <Typography variant="body2">
                <strong>Telefone Celular:</strong> {pessoaInfo.telefoneCelular}
              </Typography>
              <Typography variant="body2">
                <strong>E-mail:</strong> {pessoaInfo.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Forma de pagamento
              </Typography>
              {console.log("Dados bancários:", pessoaInfo.dadosBancarios)}
              {pessoaInfo.dadosBancarios && pessoaInfo.dadosBancarios.banco && (
                <Typography variant="body2">
                  <strong>Banco:</strong> {pessoaInfo.dadosBancarios.banco}
                </Typography>
              )}
              {pessoaInfo.dadosBancarios && pessoaInfo.dadosBancarios.conta && (
                <Typography variant="body2">
                  <strong>Conta:</strong> {pessoaInfo.dadosBancarios.conta}
                </Typography>
              )}
              {pessoaInfo.dadosBancarios &&
                pessoaInfo.dadosBancarios.agencia && (
                  <Typography variant="body2">
                    <strong>Agência:</strong>{" "}
                    {pessoaInfo.dadosBancarios.agencia}
                  </Typography>
                )}
              {pessoaInfo.dadosBancarios &&
                pessoaInfo.dadosBancarios.chavePix && (
                  <Typography variant="body2">
                    <strong>Chave Pix:</strong>{" "}
                    {pessoaInfo.dadosBancarios.chavePix}
                  </Typography>
                )}
              {/* Verificar se a propriedade formaPagamento está presente */}
              {pessoaInfo.dadosBancarios &&
                pessoaInfo.dadosBancarios.formaPagamento && (
                  <Typography variant="body2">
                    <strong>Forma de Pagamento:</strong>{" "}
                    {pessoaInfo.dadosBancarios.formaPagamento}
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>
              {pessoaInfo.endereco.cep !== undefined && (
                <Typography variant="body2">
                  <strong>CEP:</strong> {pessoaInfo.endereco.cep}
                </Typography>
              )}
              {pessoaInfo.endereco.bairro !== undefined && (
                <Typography variant="body2">
                  <strong>Bairro:</strong> {pessoaInfo.endereco.bairro}
                </Typography>
              )}
              {pessoaInfo.endereco.cidade !== undefined && (
                <Typography variant="body2">
                  <strong>Cidade:</strong> {pessoaInfo.endereco.cidade}
                </Typography>
              )}
              {pessoaInfo.endereco.estado !== undefined && (
                <Typography variant="body2">
                  <strong>Estado:</strong> {pessoaInfo.endereco.estado}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Quantidade de imóveis: {pessoaInfo.imoveis.length}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
      <Box mt={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleShowUltimosContratos}
        >
          Últimos Contratos
        </Button>
        {showUltimosContratos && <div>Últimos Contratos</div>}
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
    </div>
  );
}

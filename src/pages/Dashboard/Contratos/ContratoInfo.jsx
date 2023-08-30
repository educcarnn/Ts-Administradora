import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { DashboarDiv } from "../style";
import Sidebar from "../../../components/DashboardComponents/Sidebar";
import SearchIcon from "@material-ui/icons/Search";
import { API_URL } from "../../../db/Api";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person"; // Ícone para representar pessoas
import HomeIcon from "@material-ui/icons/Home"; // Ícone para representar imóveis
import LocationOnIcon from "@material-ui/icons/LocationOn";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import differenceInYears from "date-fns/differenceInYears";
import formatarData from "../../../utils/utils";
import contratos from "../../../assets/Videos/contratos.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  filtro: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    // Isso garante que o Paper ocupe o espaço necessário
    width: "100%",
    overflow: "hidden", // Isso esconde qualquer conteúdo filho que ultrapasse o tamanho do Paper
    marginBottom: theme.spacing(2), // Espaçamento na parte inferior, se necessário
    [theme.breakpoints.down("sm")]: {
      // Se quiser estilizações específicas para telas pequenas, insira-as aqui
    },
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      overflowX: "auto",
    },
    "& table": {
      display: "inline-block",
      whiteSpace: "nowrap",
    }
  },
  th: {
    padding: "10px 15px",
    borderBottom: "1px solid #d1d1d1",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    textAlign: "left",
  },
  td: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    color: "black",
  },
  tr: {
    backgroundColor: "#EAEAEA",
    "&:hover": {
      backgroundColor: "#D3D3D3",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#DCDCDC",
    },
  },
  textFieldBranco: {
    backgroundColor: "#FFFFFF",
  },
}));

const divContainer = styled.div`
  .bold {
    font-weight: bold;
  }
`;

const StyledContainer = styled.div`
  background: url(${contratos}) no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh; // garante que cubra toda a altura da tela
  overflow: auto;
`;


function ListaContratos() {
  const classes = useStyles();
  const [contratos, setContratos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const hoje = new Date();
  const contratosOrdenados = contratos?.sort(
    (a, b) => new Date(a.dataTermino) - new Date(b.dataTermino)
  );

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await API_URL.get(`/obter-contratos-novo`);

        setContratos(response.data);
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      }
    };
    fetchContratos();
  }, []);
  const dataTermino = new Date(contratos?.detalhesContrato?.dataTermino);
  const venceu = hoje > dataTermino;
  const anosVencido = venceu ? differenceInYears(hoje, dataTermino) : 0;

  return (
    <StyledContainer>
      <DashboarDiv>TS Administradora - Contratos</DashboarDiv>
      <Sidebar />
      <Container className={classes.root}>
        <div className={classes.filtro}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                label="Pesquisar"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </Grid>
          </Grid>
        </div>
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.th}>Vencimento</TableCell>
                <TableCell className={classes.th}>Contrato</TableCell>
                <TableCell className={classes.th}>Aluguel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contratosOrdenados.map((contrato) => (
                <TableRow key={contrato.id} className={classes.tr}>
                  <TableCell className={classes.td}>
                    {formatarData(contrato.detalhesContrato?.dataTermino)}
                    {venceu && ` (Venceu há ${anosVencido} ano(s))`}
                  </TableCell>
                  <TableCell className={classes.td}>
                    <div>
                      <strong>{`Contrato ${contrato.id} `}</strong> <HomeIcon />
                      {` ${contrato.imovel?.generoImovel} no ${
                        contrato.imovel?.localizacao?.bairro
                      }, N ${contrato.imovel?.localizacao?.numero} ${
                        contrato.imovel?.localizacao?.andar
                          ? `AP ${contrato.imovel?.localizacao?.andar}`
                          : ""
                      }, `}
                      <LocationOnIcon />
                      {`CEP: ${contrato.imovel?.localizacao?.cep}`}
                    </div>
                    <div>
                      <PersonIcon /> {contrato.proprietario?.nome}
                    </div>
                    <div>
                      <VpnKeyIcon /> {contrato.inquilino?.nome}
                    </div>
                  </TableCell>
                  <TableCell className={classes.td}>
                    <div>Valor {contrato.detalhesContrato?.valor}</div>
                    <div>
                      Taxa de adm{" "}
                      {contrato.imovel?.negociacao?.valores?.taxaAdministracao}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </StyledContainer>
  );
}

export default ListaContratos;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../style";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/DashboardComponents/Sidebar";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import Pagination from "@material-ui/lab/Pagination";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import imovel from "../../../assets/Videos/imovel.mp4";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  filtro: {
    marginBottom: theme.spacing(3),
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      overflowX: "auto",
      display: "block",
    },
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
  secondaryText: {
    color: "#aaa",
    display: "block",
  },
  card: {
    color: "white",
    marginTop: "4px",
    width: "80%",
    textAlign: "center",
    borderRadius: "5px",
    backgroundColor: "orange",
  },
  videoBackground: {
    position: "fixed",
    top: "50%",
    left: "50%",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    zIndex: "-1",
    transform: "translate(-50%, -50%)",
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
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid white",
    },
  },
  icon: {
    color: "#FFFF",
  },
  // Estilos adicionados para a paginação
  pagination: {
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
    "& .MuiPaginationItem-root": {
      color: "#fff", // Cor do texto do botão
      borderColor: "#fff", // Cor da borda do botão
    },
    "& .Mui-selected": {
      backgroundColor: "#fff", // Cor de fundo do botão selecionado
      color: "#000", // Cor do texto do botão selecionado
      "&:hover": {
        backgroundColor: "#eee", // Cor de fundo ao passar o mouse sobre o botão selecionado
      },
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)", // Cor de fundo ao passar o mouse sobre o botão
    },
  },
  paginationButton: {
    backgroundColor: "#f4f4f4",
    border: "none",
    margin: theme.spacing(0.5),
    padding: theme.spacing(1.25, 2),
    borderRadius: "5px",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  paginationActiveButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  paginationNavigationButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function ListaImoveis() {
  const classes = useStyles();
  const [imoveis, setImoveis] = useState([]);
  const [contrato, setContrato] = useState([]);
  const [filtro, setFiltro] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [imoveisPerPage] = useState(10);

  useEffect(() => {
    const fetchImoveisEContratos = async () => {
      try {
        const responseImoveis = await API_URL.get(`/obter-imoveis-novo`);
        const imoveisData = responseImoveis.data;

        imoveisData.sort((a, b) => a.id - b.id);

        const responseContratos = await API_URL.get("/obter-contratos-novo/");
        const contratosData = responseContratos.data;

        
        const contratosPorId = contratosData.reduce((acc, contrato) => {
          acc[contrato.id] = contrato;
          return acc;
        }, {});

        setContrato(contratosPorId);
        setImoveis(imoveisData);
      } catch (error) {
        console.error("Erro ao buscar imóveis e contratos:", error);
      }
    };

    fetchImoveisEContratos();
  }, []);

  const filteredImoveis = imoveis.filter((imovel) => {
    return (
      // ID do imóvel
      imovel.id.toString().includes(filtro) ||
      (imovel.pessoas &&
        imovel.pessoas.some(
          (pessoa) =>
            pessoa &&
            pessoa.nome &&
            pessoa.nome.toLowerCase().includes(filtro.toLowerCase())
        )) ||
      // Localização do imóvel: Endereço, Cidade ou Estado
      (imovel.localizacao &&
        ((imovel.localizacao.endereco &&
          imovel.localizacao.endereco
            .toLowerCase()
            .includes(filtro.toLowerCase())) ||
          (imovel.localizacao.cidade &&
            imovel.localizacao.cidade
              .toLowerCase()
              .includes(filtro.toLowerCase())) ||
          (imovel.localizacao.estado &&
            imovel.localizacao.estado
              .toLowerCase()
              .includes(filtro.toLowerCase())))) ||
      // Nome do proprietário
      (imovel.proprietario &&
        imovel.proprietario.nome &&
        imovel.proprietario.nome.toLowerCase().includes(filtro.toLowerCase()))
    );
  });

  const indexOfLastImovel = currentPage * imoveisPerPage;
  const indexOfFirstImovel = indexOfLastImovel - imoveisPerPage;
  const currentImoveis = filteredImoveis.slice(
    indexOfFirstImovel,
    indexOfLastImovel
  );

  return (
    <>
      <div>
        <DashboarDiv>TS Administradora - Imóveis</DashboarDiv>
        <Sidebar />
        <Container className={classes.root}>
          <video
            autoPlay="autoplay"
            loop="loop"
            muted
            className={classes.videoBackground}
          >
            <source src={imovel} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
          <div className={classes.filtro}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon className={classes.icon} />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.textFieldBranco}
                  label="Pesquisar"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.th}>ID</TableCell>
                <TableCell className={classes.th}>Localização</TableCell>
                <TableCell className={classes.th}>
                  <AttachMoneyIcon /> Valor de Venda
                </TableCell>
                <TableCell className={classes.th}>
                  <AttachMoneyIcon /> Valor de Aluguel
                </TableCell>
                <TableCell className={classes.th}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentImoveis.map((imovel) => (
                <TableRow key={imovel.id} className={classes.tr}>
                  <TableCell className={classes.td}>
                    <Link to={`/admin/imovel/${imovel.id}`}>{imovel.id}</Link>
                  </TableCell>

                  <TableCell className={classes.td}>
                    <HomeIcon />
                    {`${imovel.generoImovel} no ${imovel.localizacao?.bairro}, ${imovel.localizacao?.endereco} N ${imovel.localizacao?.numero}, Andar: ${imovel.localizacao.andar}, Bairro: ${imovel.localizacao.bairro}`}
                    <span className={classes.secondaryText}>
                      {`${imovel.localizacao?.cidade}, ${imovel.localizacao.estado}`}
                    </span>
                  </TableCell>
                  <TableCell className={classes.td}>
                    {imovel.negociacao?.valores?.valorVenda
                      ? `R$ ${imovel.negociacao.valores.valorVenda}`
                      : "Imóvel não é para venda"}
                  </TableCell>
                  <TableCell className={classes.td}>
                    R$ {imovel.negociacao?.valores?.valorAluguel}
                  </TableCell>
                  <TableCell>
                    <div className={classes.card}>
                      {contrato[imovel.id]
                        ? `Locado para ${contrato[imovel.id]?.inquilino?.nome}`
                        : "Imóvel vazio"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
    shape="rounded"
    variant="outlined"
    count={Math.ceil(filteredImoveis.length / imoveisPerPage)}
    page={currentPage}
    onChange={(event, newPage) => setCurrentPage(newPage)}
    classes={{ ul: useStyles().pagination }}
/>
        </Container>
      </div>
    </>
  );
}
export default ListaImoveis;

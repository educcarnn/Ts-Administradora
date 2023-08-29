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

import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import imovel from "../../../assets/Videos/imovel.mp4";

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
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid white'
    },
  },
  icon: {
    backgroundColor: "#FFFF",
  },
}));

function ListaImoveis() {
  const classes = useStyles();
  const [imoveis, setImoveis] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch(`${API_URL}/obter-imoveis-novo`);
        const data = await response.json();

        console.log(data);
        data.sort((a, b) => a.id - b.id);
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };
    fetchImoveis();
  }, []);

  const filteredImoveis = imoveis.filter((imovel) => {
    return (
      imovel.id.toString().includes(filtro) ||
      (imovel.pessoas &&
        imovel.pessoas.some((pessoa) =>
          pessoa.nome.toLowerCase().includes(filtro.toLowerCase())
        )) ||
      (imovel.localizacao &&
        (imovel.localizacao.endereco
          .toLowerCase()
          .includes(filtro.toLowerCase()) ||
          (imovel.localizacao.cidade &&
            imovel.localizacao.cidade
              .toLowerCase()
              .includes(filtro.toLowerCase())) ||
          (imovel.localizacao.estado &&
            imovel.localizacao.estado
              .toLowerCase()
              .includes(filtro.toLowerCase())))) ||
      (imovel.proprietario &&
        imovel.proprietario.nome &&
        imovel.proprietario.nome.toLowerCase().includes(filtro.toLowerCase()))
    );
  });

  return (
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
        <table className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>ID</th>
              <th className={classes.th}>Proprietário</th>
              <th className={classes.th}>Localização</th>
              <th className={classes.th}>
                <AttachMoneyIcon /> Valor de Venda
              </th>
              <th className={classes.th}>
                <AttachMoneyIcon /> Valor de Aluguel
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredImoveis.map((imovel) => (
              <tr key={imovel.id} className={classes.tr}>
                <td className={classes.td}>
                  <Link to={`/imovel/${imovel.id}`}>{imovel.id}</Link>
                </td>
                <td className={classes.td}>
                  <Link to={`/obter-usuario/${imovel.proprietario?.id}`}>
                    {imovel.proprietario?.nome}
                  </Link>
                </td>
                <td className={classes.td}>
                  <HomeIcon />
                  {`${imovel.tipoImovel} no ${imovel.localizacao?.bairro}, ${imovel.localizacao?.endereco} N ${imovel.localizacao?.numero}, Andar: ${imovel.localizacao.andar}, Bairro: ${imovel.localizacao.bairro}`}
                  <span className={classes.secondaryText}>
                    {`${imovel.localizacao.cidade}, ${imovel.localizacao.estado}`}
                  </span>
                </td>
                <td className={classes.td}>
                  R$ {imovel.negociacao?.valores.valorVenda}
                </td>
                <td className={classes.td}>
                  R$ {imovel.negociacao?.valores.valorAluguel}
                  <div className={classes.card}>
                    {imovel.contratos && imovel.contratos.length === 0
                      ? "Imóvel vazio"
                      : "Locado"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}
export default ListaImoveis;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { API_URL } from "../../db/Api";
import { DashboarDiv } from "../Dashboard/style";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import Sidebar from "../../components/DashboardComponents/Sidebar";
import Clientes from "../../assets/Videos/fundoClientes.png";

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '20px auto',
      maxWidth: '95%',
      padding: '20px',
    
      boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
    },
    filtro: {
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      padding: '10px 15px',
      borderBottom: '1px solid #d1d1d1',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      textAlign: 'left',
    },
    td: {
      padding: '10px 15px',
      borderBottom: '1px solid #d1d1d1',
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
    pageBackground: {
      backgroundImage: `url(${Clientes})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      height: "100vh",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: -1,
    },
}));

export default function Inquilino() {
  const classes = useStyles();
  const [pessoas, setPessoas] = useState([]);
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await API_URL.get(`/obter-novas-pessoas`);
        console.log(response.data)
        const inquilinos = response.data.filter(
          (person) => person.funcao === "Inquilino"
        ); 
        setPessoas(inquilinos);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    };

    fetchPessoas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/cadastro-pessoa-fisica/${id}`);
      setPessoas(pessoas.filter((person) => person.id !== id));
      console.log("Pessoa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  const sortedPeople = [...pessoas].sort((a, b) => a.id - b.id);

  return (
    <div>
      <DashboarDiv>TS Administradora - Lista de Inquilinos</DashboarDiv>
      <Sidebar />
      <Container className={classes.root}>
      <div className={classes.pageBackground}></div>
        <div className={classes.filtro}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Pesquisar"
              className={classes.textFieldBranco}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
        
        {sortedPeople.length === 0 ? (
          <p className={classes.textFieldBranco}>Não há inquilinos registrados.</p>
        ) : (
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th}>ID</th>
                <th className={classes.th}>Nome Completo</th>
                <th className={classes.th}>CPF</th>
                <th className={classes.th}>Profissão</th>
                <th className={classes.th}>Função</th>
                <th className={classes.th}>Telefone Fixo</th>
                <th className={classes.th}>Telefone Celular</th>
                <th className={classes.th}>E-mail</th>
                <th className={classes.th}>Imóveis</th>
                <th className={classes.th}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeople.map((person) => (
                <tr key={person.id} className={classes.tr}>
                  <td className={classes.td}>
                    <Link to={`/obter-usuario/${person.id}`}>{person.id}</Link>
                  </td>
                  <td className={classes.td}>
                    <Link to={`/obter-usuario/${person.id}`}>{person.nome}</Link>
                  </td>
                  <td className={classes.td}>{person.cpf}</td>
                  <td className={classes.td}>{person.profissao}</td>
                  <td className={classes.td}>{person.funcao}</td>
                  <td className={classes.td}>{person.telefoneCelular}</td>
                  <td className={classes.td}>{person.telefoneFixo}</td>
                  <td className={classes.td}>{person.email}</td>
                  <td className={classes.td}>
                    {person.imoveisProprietarios
                      ? person.imoveisProprietarios.length
                      : 0}
                  </td>
                  <td className={classes.td}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(person.id)}
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
}

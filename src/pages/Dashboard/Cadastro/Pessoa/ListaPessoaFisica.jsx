import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Container from "@material-ui/core/Container";
import { API_URL } from "../../../../db/Api";
import { DashboarDiv } from "../../style";
import { Link } from "react-router-dom";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../../../../components/DashboardComponents/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  filtro: {
    marginBottom: theme.spacing(3),
  },
  pessoaCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: theme.spacing(2),
  },
  th: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
}));

function ListaPessoaFísica() {
  const classes = useStyles();
  const [pessoasFisicas, setPessoasFisicas] = useState([]);
  const [originalPessoas, setOriginalPessoas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [orderByImoveis, setOrderByImoveis] = useState(false);

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await axios.get(`${API_URL}/obter-novas-pessoas`);
        setPessoasFisicas(response.data);
        setOriginalPessoas(response.data); 
   
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    };

    fetchPessoas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/cadastro-pessoa-fisica/${id}`);
      setPessoasFisicas(pessoasFisicas.filter((person) => person.id !== id));

    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  const sortedPeople = [...pessoasFisicas].sort((a, b) => {
    if (orderByImoveis) {
      const aLength = a.imoveis ? a.imoveis.length : 0;
      const bLength = b.imoveis ? b.imoveis.length : 0;
      return bLength - aLength;
    } else {
      return a.id - b.id;
    }
  });
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderByImoveis = () => {
    setOrderByImoveis(!orderByImoveis);
  };

  const handleFilterByFunction = (event) => {
    const selectedFunction = event.target.value;
    // Filtrar pessoas pelo tipo de função selecionado
    const filteredPeopleByFunction = originalPessoas.filter(
      (person) => person.funcao === selectedFunction
    );
    setPessoasFisicas(filteredPeopleByFunction);
  };

  const filteredAndSortedPeople = pessoasFisicas
    .filter((person) => {
      return (
        (person && person.id.toString().includes(filtro)) ||
        person.cpf.includes(filtro) ||
        person.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        person.funcao.toLowerCase().includes(filtro.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (orderByImoveis) {
        const aLength = a.imoveisProprietarios
          ? a.imoveisProprietarios.length
          : 0;
        const bLength = b.imoveisProprietarios
          ? b.imoveisProprietarios.length
          : 0;
        return bLength - aLength;
      } else {
        return a.id - b.id;
      }
    });

  return (
    <div>
      <DashboarDiv>TS Administradora - Lista de Proprietários</DashboarDiv>
      <Sidebar />
      <Container className={classes.root}>
        <div className={classes.filtro}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "16px" }}>
              <TextField
                label="Pesquisar"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            <div style={{ marginRight: "16px" }}>
              <InputLabel htmlFor="order-by">Ordenar por</InputLabel>
              <FormControl variant="outlined">
                <Select
                  id="order-by"
                  value={orderByImoveis}
                  onChange={handleOrderByImoveis}
                >
                  <MenuItem value={false}>ID</MenuItem>
                  <MenuItem value={true}>Mais Imóveis</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
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
            {filteredAndSortedPeople.map((person) => (
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
      </Container>
    </div>
  );
}

export default ListaPessoaFísica;

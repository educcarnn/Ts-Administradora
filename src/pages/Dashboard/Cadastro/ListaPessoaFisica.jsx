import React, { useState, useEffect } from "react";
import { DashboarDiv } from "../../Dashboard/style";
import axios from "axios";
import { API_URL } from "../../../db/Api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { RowContainer } from "../../../pages/Dashboard/Imoveis/style"; // Certifique-se de importar o componente corretamente
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContainerElements = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ListaPessoaFísica() {
  const [pessoasFisicas, setPessoasFisicas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPessoas = async () => {
      try {
        const response = await axios.get(`${API_URL}/obter-novas-pessoas`);
        setPessoasFisicas(response.data);
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
      console.log("Pessoa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPeople = pessoasFisicas.filter(
    (person) =>
      person.id.toString().includes(searchTerm) ||
      person.cpf.includes(searchTerm) ||
      person.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora - Lista de Proprietários</div>
      </DashboarDiv>
      <RowContainer>
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome Completo</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Profissão</TableCell>
                  <TableCell>Função</TableCell>
                  <TableCell>Telefone Fixo</TableCell>
                  <TableCell>Telefone Celular</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPeople.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>{person.id}</TableCell>
                    <TableCell>
                      <Link to={`/obter-usuario/${person.id}`}>{person.nome}</Link>
                    </TableCell>
                    <TableCell>{person.cpf}</TableCell>
                    <TableCell>{person.profissao}</TableCell>
                    <TableCell>{person.funcao}</TableCell>
                    <TableCell>{person.telefoneCelular}</TableCell>
                    <TableCell>{person.telefoneFixo}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => console.log("Editar")}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(person.id)}
                      >
                        Deletar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => console.log("Informações e Anexos")}
                      >
                        Mais
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <ContainerElements>
          <TextField
            label="Pesquisar por ID, CPF ou Nome"
            variant="outlined"
            margin="normal"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </ContainerElements>
      </RowContainer>
    </div>
  );
}

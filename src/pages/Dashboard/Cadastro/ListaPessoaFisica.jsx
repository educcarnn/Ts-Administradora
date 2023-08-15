import React, { useState, useEffect } from "react";
import { DashboarDiv } from "../../Dashboard/style";
import axios from "axios";
import { API_URL } from "../../../db/Api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export default function ListaPessoaFísica() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await axios.get(`${API_URL}/obter-usuarios-cadastrados `);
        setPeople(response.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error);
      }
    }

    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/cadastro-pessoa-fisica/${id}`);
      setPeople(people.filter(person => person.id !== id));
      console.log("Pessoa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  return (
    <div>
      <DashboarDiv>
        <div>TS Administrativo - Lista de Pessoas Físicas</div>
      </DashboarDiv>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
            {people.map((person) => (
              <TableRow key={person.id}>
                {console.log(person)}
                <TableCell>{person.nome}</TableCell>
                <TableCell>{person.cpf}</TableCell>
                <TableCell>{person.profissao}</TableCell>
                <TableCell>{person.funcao}</TableCell>
                <TableCell>{person.telefone_fixo}</TableCell>
                <TableCell>{person.telefone_celular}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => (person.id)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(person.id)}>
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { DashboarDiv } from "../../style";
import axios from "axios";
import { API_URL } from "../../../../db/Api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export default function ListaPessoaJuridica() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/obter-usuarios-cadastrados`);
        const companiesFiltradas = response.data.filter(
          (company) => company.tipo === "Jurídica"
        );
        setCompanies(companiesFiltradas);
        console.log(response);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchCompanies(); // Chama a função fetchCompanies para buscar os dados da API
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/cadastro-pessoa-juridica/${id}`);
      setCompanies(companies.filter(company => company.id !== id));
      console.log("Empresa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar empresa:", error);
    }
  };

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora - Lista de Pessoas Jurídicas</div>
      </DashboarDiv>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Razão Social</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Nome Fantasia</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.razao_social}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.nome_fantasia}</TableCell>
                <TableCell>{company.endereco}</TableCell>
                <TableCell>{company.telefone}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => (company.id)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(company.id)}>
                    Deletar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(company.id)}>
                    Informações e Anexos
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

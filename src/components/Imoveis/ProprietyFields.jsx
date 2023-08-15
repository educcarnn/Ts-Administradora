import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios"; // Importe a biblioteca Axios
import { API_URL } from "../../db/Api";


const StyledProprietyFields = styled.div`
  /* ... (seu estilo) ... */
`;

const ProprietyFields = () => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const response = await axios.get(`${API_URL}/obter-usuarios-cadastrados`);
        const proprietariosFiltrados = response.data.filter((user) =>
          user.funcao.includes("proprietario")
        );
        setOwners(proprietariosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
      }
    }

    fetchOwners();
  }, []);

  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  return (
    <StyledProprietyFields>
      <Typography variant="body1">Proprietários</Typography>
      <FormControl fullWidth>
        <InputLabel>Selecione um proprietário</InputLabel>
        <Select value={selectedOwner} onChange={handleOwnerChange}>
          {owners.map((owner) => (
            <MenuItem key={owner.id} value={owner.id}>
              {owner.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="fieldWrapper">
        <Typography variant="body1">Proprietário(%)</Typography>
        <TextField placeholder="Percentual" fullWidth />
      </div>
      <Button variant="contained" color="primary" className="addButton">
        Adicionar
      </Button>
    </StyledProprietyFields>
  );
};

export default ProprietyFields;

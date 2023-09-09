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
import axios from "axios";
import ModalPessoaFisica from "../../pages/Dashboard/Cadastro/UsuarioInfo/components/modalPessoaFísica";
import { API_URL } from "../../db/Api";
import { useFormularioContext } from "../../../src/context/CadastroProvider";

const StyledProprietyFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

const ProprietyFields = () => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [owners, setOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const { dadosFormulario, setDadosFormulario, setPerson } =
    useFormularioContext();

  useEffect(() => {
    async function fetchOwners() {
      try {
        const response = await API_URL.get(`/obter-novas-pessoas`);

        const filteredOwners = response.data.filter((person) => {
          return (
            person.funcao.includes("Proprietário") ||
            person.funcao.includes("Proprietario")
          );
        });

        setOwners(filteredOwners);

      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
      }
    }

    fetchOwners();
  }, []);
  const handleOwnerChange = (event) => {
    const ownerId = event.target.value;
    setPerson(ownerId);
    setSelectedOwner(ownerId); // Atualize o proprietário selecionado

    setDadosFormulario((prevData) => ({
      ...prevData,
      pessoaId: ownerId,
    }));
  };

  return (
    <StyledProprietyFields>
      <TextPage>Proprietário</TextPage>
      {owners.length > 0 && (
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
      )}
      <div className="fieldWrapper">
        <Typography variant="body1">Proprietário(%)</Typography>
        <TextField
          label="Percentual"
          variant="outlined"
          type="text"
          inputProps={{
            step: "0.01",
            min: "0",
            style: { appearance: "textfield" },
          }}
          value={dadosFormulario?.proprietários?.percentual || ""}
          onChange={(event) => {
            const percentual = parseFloat(event.target.value);
            if (!isNaN(percentual)) {
              setDadosFormulario((prevData) => ({
                ...prevData,
                proprietários: {
                  ...prevData.proprietários,
                  percentual,
                },
              }));
            }
          }}
        />
      </div>
      {/*  <Button
        variant="contained"
        color="primary"
        className="addButton"
        onClick={() => setModalOpen(true)}
      >
        Adicionar
      </Button> */}
    
      <ModalPessoaFisica open={modalOpen} handleClose={handleClose} />
    </StyledProprietyFields>
  );
};

export default ProprietyFields;

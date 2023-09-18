import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import ModalPessoaJuridica from "../../pages/Dashboard/Cadastro/PessoaJuridica/components/modalPessoaJuridica";
import ModalPessoaFisica from "../../pages/Dashboard/Cadastro/UsuarioInfo/components/modalPessoaFísica";
import { API_URL } from "../../db/Api";
import { useFormularioContext } from "../../../src/context/CadastroProvider";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
const StyledProprietyFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; /* Adicione a margem superior desejada */
  margin-bottom: 20px; /* Adicione a margem inferior desejada */
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

const ProprietyFields = () => {
  const [ownersList, setOwnersList] = useState([
    { id: "", nome: "", percentual: 0 },
  ]);
  const [owners, setOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { dadosFormulario, setDadosFormulario, setPerson } =
    useFormularioContext();

  const [modalPessoaFisicaOpen, setModalPessoaFisicaOpen] = useState(false);
  const [modalPessoaJuridicaOpen, setModalPessoaJuridicaOpen] = useState(false);

  const handleCloseModalPessoaFisica = () => {
    setModalPessoaFisicaOpen(false);
  };
  const handleCloseModalPessoaJuridica = () => {
    setModalPessoaJuridicaOpen(false);
  };

  
  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    async function fetchOwners() {
      try {
        const response = await API_URL.get(`/obter-novas-pessoas`);
        console.log(response);
        const filteredOwners = response.data.filter(
          (person) =>
            person?.dadosComuns && person?.dadosComuns?.funcao && (
              person.dadosComuns?.funcao?.includes("Proprietário") ||
              person.dadosComuns?.funcao?.includes("Proprietario")
            )
        );
        setOwners(filteredOwners);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
      }
    }
    fetchOwners();
  }, []);

  const handleOwnerChange = (index, ownerId) => {
    const newOwnersList = [...ownersList];
    newOwnersList[index].id = ownerId;
    setOwnersList(newOwnersList);
    setPerson(ownerId);

    setDadosFormulario((prev) => ({ ...prev, proprietarios: newOwnersList }));
  };

  const handlePercentChange = (index, value) => {
    const newOwnersList = [...ownersList];
    const percentual = parseFloat(value);
    const totalPercentage =
      newOwnersList.reduce((acc, owner) => acc + owner.percentual, 0) -
      newOwnersList[index].percentual +
      percentual;

    if (!isNaN(percentual) && totalPercentage <= 100) {
      newOwnersList[index].percentual = percentual;
      setOwnersList(newOwnersList);

      setDadosFormulario((prev) => ({ ...prev, proprietarios: newOwnersList }));
    }
  };

  const handleAddOwner = () => {
    const newOwner = { id: "", nome: "", percentual: 0 };
    setOwnersList((prev) => [...prev, newOwner]);

    setDadosFormulario((prev) => ({
      ...prev,
      proprietarios: [...prev.proprietarios, newOwner],
    }));
  };

  const handleRemoveOwner = (index) => {
    const newOwnersList = [...ownersList];
    newOwnersList.splice(index, 1);
    setOwnersList(newOwnersList);

    setDadosFormulario((prev) => {
      const newProprietarios = [...prev.proprietarios];
      newProprietarios.splice(index, 1);
      return { ...prev, proprietarios: newProprietarios };
    });
  };

  return (
    <StyledProprietyFields>
      <TextPage>Proprietários</TextPage>
      {owners.length > 0 &&
        ownersList.map((ownerData, index) => (
          <Grid container spacing={3} key={index}>
            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel>Selecione um proprietário</InputLabel>
                <Select
                  value={ownerData.id}
                  onChange={(e) => handleOwnerChange(index, e.target.value)}
                >
                  {owners.map((owner) => (
                    <MenuItem key={owner.id} value={owner.id}>
                      {owner.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="Percentual"
                variant="outlined"
                type="text"
                inputProps={{
                  step: "0.01",
                  min: "0",
                  style: { appearance: "textfield" },
                }}
                value={ownerData.percentual || ""}
                onChange={(event) =>
                  handlePercentChange(index, event.target.value)
                }
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton color="primary" onClick={handleAddOwner}>
                <AddIcon />
              </IconButton>
              {ownersList.length > 1 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveOwner(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Novo Cliente
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Qual o tipo de cliente?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setModalOpen(false);
              setModalPessoaFisicaOpen(true);
            }}
            color="primary"
          >
            Pessoa Física
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
              setModalPessoaJuridicaOpen(true);
            }}
            color="primary"
          >
            Pessoa Jurídica
          </Button>
        </DialogActions>
      </Dialog>

      <ModalPessoaFisica
        open={modalPessoaFisicaOpen}
        handleClose={handleCloseModalPessoaFisica}
      />
      <ModalPessoaJuridica
        open={modalPessoaJuridicaOpen}
        handleClose={handleCloseModalPessoaJuridica} // Ajuste a função de fechamento para a Pessoa Jurídica
      />
    </StyledProprietyFields>
  );
};

export default ProprietyFields;

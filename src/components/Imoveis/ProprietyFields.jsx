import { useState, useEffect } from "react";
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ProprietyFields = () => {
  const { register, Controller, control } = useFormularioContext();
  const [owners, setOwners] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPessoaFisicaOpen, setModalPessoaFisicaOpen] = useState(false);
  const [modalPessoaJuridicaOpen, setModalPessoaJuridicaOpen] = useState(false);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const responseFisica = await API_URL.get(`/obter-novas-pessoas`);
        const responseJuridica = await API_URL.get(
          `/obter-novas-pessoas-juridica`
        );
        const combinedData = [...responseFisica.data, ...responseJuridica.data];
        console.log(combinedData);
        const filteredOwners = combinedData.filter(
          (person) =>
            person?.dadosComuns?.funcao?.includes("Proprietário") ||
            person?.dadosComuns?.funcao?.includes("Proprietario")
        );
        setOwners(filteredOwners);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
      }
    }
    fetchOwners();
  }, []);

  const handleCloseModalPessoaFisica = () => {
    setModalPessoaFisicaOpen(false);
  };

  const handleCloseModalPessoaJuridica = () => {
    setModalPessoaJuridicaOpen(false);
  };

  const addOwner = (owner) => {
    setSelectedOwners([...selectedOwners, { ...owner, percentual: "" }]);
  };

  const removeOwner = (index) => {
    const newSelectedOwners = [...selectedOwners];
    newSelectedOwners.splice(index, 1);
    setSelectedOwners(newSelectedOwners);
  };

  const updateOwnerPercentual = (index, percentual) => {
    const newSelectedOwners = [...selectedOwners];
    newSelectedOwners[index].percentual = percentual;
    setSelectedOwners(newSelectedOwners);
  };

  return (
    <div>
      <Typography>Proprietários</Typography>
      <FormControl fullWidth>
        <InputLabel>Adicionar um proprietário</InputLabel>
        <Select onChange={(e) => addOwner(e.target.value)}>
          {owners.map((owner) => (
            <MenuItem value={owner} key={owner.id}>
              {owner.dadosComuns.tipo === "Física"
                ? `PF ${owner.nome}`
                : `PJ ${owner.razaoSocial}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        {selectedOwners.map((selectedOwner, index) => (
          <div key={index}>
            {console.log(selectedOwner)}
            <span>
              {selectedOwner.dadosComuns.tipo === "Física"
                ? `PF ${selectedOwner?.nome}`
                : `PJ ${selectedOwner?.razaoSocial}`}
            </span>

            <input
              type="hidden"
              {...register(`proprietarios[${index}].id`)}
              defaultValue={selectedOwner.id}
            />

            <input
              type="hidden"
              {...register(`proprietarios[${index}].tipo`)}
              defaultValue={selectedOwner.dadosComuns.tipo}
            />

            <TextField
              label="Percentual"
              variant="outlined"
              fullWidth
              {...register(`proprietarios[${index}].percentual`)}
              value={selectedOwner.percentual}
              onChange={(e) => updateOwnerPercentual(index, e.target.value)}
            />

            <button onClick={() => removeOwner(index)}>Remover</button>
          </div>
        ))}
      </div>

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
        handleClose={handleCloseModalPessoaJuridica}
        Dialog
      />
    </div>
  );
};

export default ProprietyFields;

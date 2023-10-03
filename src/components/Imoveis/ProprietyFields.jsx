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
import ModalPessoaJuridica from "../../pages/Dashboard/Cadastro/PessoaJuridica/componentsForm/modalPessoaJuridica";
import ModalPessoaFisica from "../../pages/Dashboard/Cadastro/UsuarioInfo/components/modalPessoaFísica";
import { API_URL } from "../../db/Api";
import { useFormularioContext } from "../../../src/context/CadastroProvider";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

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
  const { register, Controller, control, setValue } = useFormularioContext();
  const [owners, setOwners] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPessoaFisicaOpen, setModalPessoaFisicaOpen] = useState(false);
  const [modalPessoaJuridicaOpen, setModalPessoaJuridicaOpen] = useState(false);
  const [dadosPessoaJuridica, setDadosPessoaJuridica] = useState([]);
  const [dadosPessoaFisica, setDadosPessoaFisica] = useState([]);
  const [totalPercentError, setTotalPercentError] = useState("");
  console.log(dadosPessoaJuridica);

  useEffect(() => {
    async function fetchOwners() {
      try {
        const responseFisica = await API_URL.get(`/obter-novas-pessoas`);
        const responseJuridica = await API_URL.get(
          `/obter-novas-pessoas-juridica`
        );
        const combinedData = [...responseFisica.data, ...responseJuridica.data];

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
  }, [dadosPessoaJuridica, dadosPessoaFisica]);

  const handleCloseModalPessoaFisica = () => {
    setModalPessoaFisicaOpen(false);
  };

  const handleCloseModalPessoaJuridica = () => {
    setModalPessoaJuridicaOpen(false);
  };

  const addOwner = (owner) => {
    if (owner && owner.dadosComuns) {
      const newSelectedOwners = [
        ...selectedOwners,
        { ...owner, percentual: "" },
      ];

      const totalPercent = newSelectedOwners.reduce(
        (total, owner) => total + parseFloat(owner.percentual || 0),
        0
      );

      if (totalPercent > 100) {
        setTotalPercentError(
          "A soma dos percentuais não pode ultrapassar 100%."
        );
      } else {
        setSelectedOwners(newSelectedOwners);
        setValue("proprietarios", newSelectedOwners);
        setTotalPercentError("");
      }
    }
  };

  const removeOwner = (index) => {
    const newSelectedOwners = [...selectedOwners];
    newSelectedOwners.splice(index, 1);
    setSelectedOwners(newSelectedOwners);

    // Atualize o contexto usando setValue
    setValue("proprietarios", newSelectedOwners);

    // Calcule o total do percentual
    const totalPercent = newSelectedOwners.reduce(
      (total, owner) => total + parseFloat(owner.percentual || 0),
      0
    );

    // Verifique se o total ultrapassa 100%
    if (totalPercent > 100) {
      setTotalPercentError("A soma dos percentuais não pode ultrapassar 100%.");
    } else {
      setTotalPercentError("");
    }
  };

  const updateOwnerPercentual = (index, percentual) => {
    const newSelectedOwners = [...selectedOwners];
    newSelectedOwners[index].percentual = percentual;

    // Calcule o total do percentual atualizado
    const totalPercent = newSelectedOwners.reduce(
      (total, owner) => total + parseFloat(owner.percentual || 0),
      0
    );

    // Verifique se o total ultrapassa 100%
    if (totalPercent > 100) {
      // Corrija o percentual para que a soma total seja 100%
      const excess = totalPercent - 100;
      const correctedPercentual = parseFloat(percentual) - excess;

      // Defina o percentual corrigido no campo de entrada
      newSelectedOwners[index].percentual = correctedPercentual.toString();

      // Atualize o contexto usando setValue com o percentual corrigido
      setValue("proprietarios", newSelectedOwners);

      // Defina o erro para indicar que a soma ultrapassou 100%
      setTotalPercentError("A soma dos percentuais não pode ultrapassar 100%");
    } else {
      setSelectedOwners(newSelectedOwners);
      setValue("proprietarios", newSelectedOwners); // Atualize o contexto usando setValue
      setTotalPercentError("");
    }
  };

  return (
    <div>
      <Typography variant="h6">Proprietários</Typography>
      <FormControl fullWidth variant="outlined">
        <Autocomplete
          options={owners}
          getOptionLabel={(option) => {
            if (!option) return ""; // Verifica se o option é definido

            return option.dadosComuns.tipo === "Física"
              ? `PF ${option.nome}`
              : `PJ ${option.razaoSocial}`;
          }}
          onChange={(event, newValue) => addOwner(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Adicionar um proprietário"
              variant="outlined"
            />
          )}
        />
      </FormControl>
      <div>
        {selectedOwners.map((selectedOwner, index) => (
          <div key={index}>
            <span>
              {selectedOwner?.dadosComuns?.tipo === "Física"
                ? `PF ${selectedOwner?.nome}`
                : `PJ ${selectedOwner?.razaoSocial}`}
            </span>

            <input
              type="hidden"
              {...register(`proprietarios[${index}].id`)}
              defaultValue={selectedOwner?.id}
            />

            <input
              type="hidden"
              {...register(`proprietarios[${index}].tipo`)}
              defaultValue={selectedOwner?.dadosComuns?.tipo}
            />

            <TextField
              label="Percentual"
              variant="outlined"
              fullWidth
              {...register(`proprietarios[${index}].percentual`)}
              value={selectedOwner.percentual}
              onChange={(e) => updateOwnerPercentual(index, e.target.value)}
            />

            <DeleteIcon
              style={{ cursor: "pointer" }}
              onClick={() => removeOwner(index)}
            />
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
        setDadosPessoaFisica={setDadosPessoaFisica}
      />
      <ModalPessoaJuridica
        setDadosPessoaJuridica={setDadosPessoaJuridica}
        open={modalPessoaJuridicaOpen}
        handleClose={handleCloseModalPessoaJuridica}
        Dialog
      />
    </div>
  );
};

export default ProprietyFields;

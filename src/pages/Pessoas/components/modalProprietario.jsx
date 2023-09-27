import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { API_URL } from "../../../db/Api";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  autocomplete: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: 300,
    },
  },
}));

function ProprietarioModal({ open, handleClose }) {
  const classes = useStyles();

  const [proprietarios, setProprietarios] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [selectedProprietario, setSelectedProprietario] = useState(null);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [selectedProprietarios, setSelectedProprietarios] = useState([]);
  const [percentuais, setPercentuais] = useState([]); // Adicione um estado para os percentuais
  const [proprietariosDoImovel, setProprietariosDoImovel] = useState([]); // Novo estado para os proprietários do imóvel selecionado

  useEffect(() => {
    async function fetchProprietarios() {
      try {
        const responseProprietarios = await API_URL.get(`/obter-novas-pessoas`);
        setProprietarios(responseProprietarios.data);
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
      }
    }
    fetchProprietarios();
  }, []);

  useEffect(() => {
    async function fetchImoveisEContratos() {
      try {
        const responseImoveis = await API_URL.get(`/obter-imoveis-novo`);
        const imoveisData = responseImoveis.data;

        const imoveisSemProprietarios = imoveisData.filter(
          (imovel) => !imovel.proprietarios || imovel.proprietarios.length === 0
        );

        imoveisSemProprietarios.sort((a, b) => a.id - b.id);
        setImoveis(imoveisSemProprietarios);
      } catch (error) {
        console.error("Erro ao buscar imóveis e contratos:", error);
      }
    }
    fetchImoveisEContratos();
  }, []);

  // Novo useEffect para atualizar os proprietários do imóvel selecionado
  useEffect(() => {
    if (selectedImovel) {
      const proprietariosDoImovel = selectedImovel.imoveisProprietarios.map(
        (proprietario) => ({
          nome: proprietario.pessoa ? proprietario.pessoa.nome : proprietario.pessoaJuridica.nome,
          percentual: proprietario.percentualPropriedade,
        })
      );
      setProprietariosDoImovel(proprietariosDoImovel);
    } else {
      setProprietariosDoImovel([]);
    }
  }, [selectedImovel]);

  const handleCadastro = async () => {
    try {
      const proprietariosData = selectedProprietarios
        .filter((proprietario) => proprietario !== null)
        .map((proprietario, index) => ({
          id: proprietario?.id,
          percentual: parseFloat(percentuais[index]) || 0, // Use o percentual correspondente
          tipo: proprietario?.dadosComuns?.tipo,
        }));

      const payload = {
        proprietariosData,
        imovelId: selectedImovel?.id,
        status: "",
      };

      console.log(payload);
      await API_URL.post(`/cadastrar-proprietario`, payload);
      toast.success("Cadastro de proprietário realizado com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  const handleAddProprietario = () => {
    setSelectedProprietarios([...selectedProprietarios, null]);
    setPercentuais([...percentuais, ""]); // Adicione um novo percentual vazio
  };

  const handleRemoveProprietario = (indexToRemove) => {
    const updatedProprietarios = selectedProprietarios.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedPercentuais = percentuais.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedProprietarios(updatedProprietarios);
    setPercentuais(updatedPercentuais);
  };

  const handleProprietarioChange = (event, newValue, index) => {
    const updatedProprietarios = [...selectedProprietarios];
    updatedProprietarios[index] = newValue;
    setSelectedProprietarios(updatedProprietarios);
  };

  const handlePercentualChange = (event, index) => {
    const updatedPercentuais = [...percentuais];
    updatedPercentuais[index] = event.target.value;
    setPercentuais(updatedPercentuais);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Proprietário</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {selectedProprietarios.map((selectedProprietario, index) => (
              <Grid item xs={12} key={index}>
                <Autocomplete
                  className={classes.autocomplete}
                  options={proprietarios}
                  getOptionLabel={(option) => option.nome}
                  value={selectedProprietario}
                  onChange={(event, newValue) =>
                    handleProprietarioChange(event, newValue, index)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Selecione o ${index + 1}º proprietário`}
                      variant="outlined"
                    />
                  )}
                />

                <TextField
                  className={classes.autocomplete}
                  label={`Percentual do ${index + 1}º proprietário`}
                  variant="outlined"
                  value={percentuais[index]} // Use o valor do estado percentuais
                  onChange={(e) => handlePercentualChange(e, index)} // Adicione uma função para lidar com alterações no percentual
                  type="number"
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveProprietario(index)}
                >
                  Remover
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddProprietario}
              >
                Adicionar Proprietário
              </Button>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <Autocomplete
                  className={classes.autocomplete}
                  id="combo-box-demo"
                  options={imoveis}
                  getOptionLabel={(imovel) =>
                    `${imovel.id} ${imovel.generoImovel} no ${imovel.localizacao?.bairro}, ${imovel.localizacao?.endereco} N ${imovel.localizacao?.numero}, Andar: ${imovel.localizacao?.andar}, Bairro: ${imovel.localizacao?.bairro} - ${imovel.localizacao?.cidade}, ${imovel.localizacao?.estado}`
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Imóvel" variant="outlined" />
                  )}
                  onChange={(event, newValue) => setSelectedImovel(newValue)}
                  value={selectedImovel}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          {proprietariosDoImovel.length > 0 && (
            <div>
              <h3>Proprietários deste Imóvel:</h3>
              <ul>
                {proprietariosDoImovel.map((proprietario, index) => (
                  <li key={index}>
                    {proprietario.nome} - {proprietario.percentual}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCadastro} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProprietarioModal;

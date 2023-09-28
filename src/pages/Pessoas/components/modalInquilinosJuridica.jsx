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

function InquilinoModalJuridica({ open, handleClose }) {
  const classes = useStyles();

  const [fiadores, setFiadores] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [selectedFiador, setSelectedFiador] = useState(null);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [selectedInquilinos, setSelectedInquilinos] = useState([]);
  const [numModais, setNumModais] = useState(1);

  useEffect(() => {
    async function fetchFiadores() {
      try {
        const response = await API_URL.get(`/obter-novas-pessoas-juridica`);
        const filteredFiadores = response.data.filter(
          (person) =>
            person?.dadosComuns &&
            person?.dadosComuns?.funcao &&
            person.dadosComuns?.funcao?.includes("Inquilino")
        );
        setFiadores(filteredFiadores);
      } catch (error) {
        console.error("Erro ao buscar fiadores:", error);
      }
    }
    fetchFiadores();
  }, []);

  useEffect(() => {
    async function fetchImoveisEContratos() {
      try {
        const responseImoveis = await API_URL.get(`/obter-imoveis-novo`);
        const imoveisData = responseImoveis.data;
        console.log(imoveisData)

        const imoveisSemInquilinos = imoveisData.filter((imovel) => !imovel.inquilinos || imovel.inquilinos.length === 0);
          
        imoveisSemInquilinos.sort((a, b) => a.id - b.id);
        setImoveis(imoveisSemInquilinos);
      } catch (error) {
        console.error("Erro ao buscar imóveis e contratos:", error);
      }
    }
    fetchImoveisEContratos();
  }, []);
  
  const handleCadastro = async () => {
    try {
      const inquilinosData = selectedInquilinos
        .filter((inquilino) => inquilino !== null)
        .map((inquilino) => ({
          id: inquilino?.id,
          percentual: 50,
          tipo: inquilino?.dadosComuns?.tipo
        }));

      const payload = {
        inquilinosData,
        imovelId: selectedImovel?.id,
        status: "",
      };

      console.log(payload);
      await API_URL.post(`/cadastrar-inquilino`, payload);
      toast.success("Cadastro de inquilino realizado com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  const handleAddInquilino = () => {
    setSelectedInquilinos([...selectedInquilinos, null]);
  };

  const handleRemoveInquilino = (indexToRemove) => {
    const updatedInquilinos = selectedInquilinos.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedInquilinos(updatedInquilinos);
  };

  const handleInquilinoChange = (event, newValue, index) => {
    const updatedInquilinos = [...selectedInquilinos];
    updatedInquilinos[index] = newValue;
    setSelectedInquilinos(updatedInquilinos);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Inquilino</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {selectedInquilinos.map((selectedInquilino, index) => (
              <Grid item xs={12} key={index}>
                <Autocomplete
                  className={classes.autocomplete}
                  options={fiadores}
                  getOptionLabel={(option) => option.nomeFantasia}
                  value={selectedInquilino}
                  onChange={(event, newValue) =>
                    handleInquilinoChange(event, newValue, index)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Selecione o ${index + 1}º inquilino`}
                      variant="outlined"
                    />
                  )}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemoveInquilino(index)}
                >
                  Remover
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddInquilino}
              >
                Adicionar Inquilino
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

export default InquilinoModalJuridica;

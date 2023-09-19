import React from "react";
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
import { useState, useEffect } from "react";
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

function FiadorModal({ open, handleClose }) {
  const classes = useStyles();

  const [fiadores, setFiadores] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [selectedFiador, setSelectedFiador] = useState(null);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [numeroMatriculaRGI, setNumeroMatriculaRGI] = useState("");

  const handleCadastro = async () => {
    try {
      const payload = {
        pessoaId: selectedFiador?.id,
        imovelId: selectedImovel?.id,
        numeroMatriculaRGI,
      };
      await API_URL.post("/cadastrar-fiador", payload);
      handleClose();

      toast.success("Cadastro de fiador realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  useEffect(() => {
    async function fetchFiadores() {
      try {
        const responseFisica = await API_URL.get(`/obter-novas-pessoas`);
        const filteredFiadores = responseFisica.data.filter(
          (person) =>
            person?.dadosComuns &&
            person?.dadosComuns?.funcao &&
            person.dadosComuns?.funcao?.includes("Fiador")
        );
        setFiadores(filteredFiadores);
      } catch (error) {
        console.error("Erro ao buscar fiadores:", error);
      }
    }
    fetchFiadores();
  }, []);

  useEffect(() => {
    const fetchImoveisEContratos = async () => {
      try {
        const responseImoveis = await API_URL.get(`/obter-imoveis-novo`);
        const imoveisData = responseImoveis.data;
        imoveisData.sort((a, b) => a.id - b.id);
        setImoveis(imoveisData);
      } catch (error) {
        console.error("Erro ao buscar imóveis e contratos:", error);
      }
    };
    fetchImoveisEContratos();
  }, []);

  const handleImovelChange = (event, newValue) => {
    setSelectedImovel(newValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Fiador</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                className={classes.autocomplete}
                options={fiadores}
                getOptionLabel={(option) => option.nome}
                value={selectedFiador}
                onChange={(event, newValue) => {
                  setSelectedFiador(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecione um Fiador"
                    variant="outlined"
                  />
                )}
              />
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
                  onChange={handleImovelChange}
                  value={selectedImovel}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="numeroMatriculaRGI"
                label="Número de Matrícula RGI"
                type="text"
                fullWidth
                value={numeroMatriculaRGI} // Vincule o valor do campo ao estado
                onChange={(e) => setNumeroMatriculaRGI(e.target.value)} // Atualize o estado quando o valor mudar
              />
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

export default FiadorModal;

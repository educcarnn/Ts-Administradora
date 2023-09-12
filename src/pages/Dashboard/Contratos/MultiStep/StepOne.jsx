import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";
import { API_URL } from "../../../../db/Api";
import { Container, Grid } from "@material-ui/core";
import Modalmovel from "../Info/components/modalImóvel";
import { useModal } from '../../../../context/ModalContext';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  newText: {
    display: "flex",
    flexDirection: "row",
  },
  contentRow: {
    marginTop: theme.spacing(2),
  },
  resize: {
    width: "100%",
    "& .MuiInputLabel-root": {
      fontSize: "1.2rem",
    },
    "& .MuiInputBase-root": {
      fontSize: "1.2rem",
    },
    "& .MuiSelect-root": {
      fontSize: "1.2rem",
    },
  },
  title: {
    fontSize: "1.3rem",
    marginBottom: theme.spacing(1),
  },
  truncate: {
    maxWidth: "300px !important",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dropdownStyle: {
    maxHeight: "300px",
    overflowY: "auto",
  },
}));
const StepOne = () => {
  const classes = useStyles();
  const { setDadosFormulario, dadosFormulario } = useMultiStepContext();
  const { setIsModalOpen } = useModal(); // Usando o contexto aqui
  const [imoveis, setImoveis] = useState([]);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenAndSetContext = () => {
    setModalOpen(true); // Abre o modal localmente
    setIsModalOpen(true); // Define o contexto como false
};

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setIsModalOpen(false)
  };

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await API_URL.get(`/obter-imoveis-novo`);

        setImoveis(response.data);

      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };
    fetchImoveis();
  }, []);
  const handleImovelChange = (event) => {
    const selectedImovelId = event.target.value;
    setSelectedImovel(selectedImovelId);

    const selectedImovelData = imoveis.find(
      (imovel) => imovel.id === selectedImovelId
    );

  
    const proprietorName = selectedImovelData.proprietario?.id;
    const name = selectedImovelData.proprietario?.nome;

    setDadosFormulario((prevData) => ({
      ...prevData,
      imovelId: selectedImovelId,
      proprietarioId: proprietorName,
      proprietario: name,
    }));
  };

  const handleContrato = (event) => {
    const selectedContrato = event.target.value;


    setDadosFormulario((prevData) => ({
      ...prevData,
      tipoContrato: selectedContrato,
    }));
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={3}
        className={classes.contentRow}
 
      >
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.resize} fullWidth>
            <InputLabel>Imóvel</InputLabel>
            <Select
              onChange={handleImovelChange}
              className={classes.truncate}
              MenuProps={{ classes: { paper: classes.dropdownStyle } }}
            >
              {imoveis.map((imovel) => {
                if (imovel.contratos?.length === 0) {
                  return (
                    <MenuItem key={imovel.id} value={imovel.id}>
                      {imovel.id} - {imovel.generoImovel} no{" "}
                      {imovel.localizacao.bairro}, {imovel.localizacao.endereco}{" "}
                      N° {imovel.localizacao.numero}, CEP:{" "}
                      {imovel.localizacao.cep}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
          <Button
            onClick={handleOpenAndSetContext}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Adicionar
          </Button>
              <Modalmovel open={modalOpen} handleClose={handleClose} setIsModalOpen={true}/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className={classes.title}>Proprietário</div>
          <TextField
            fullWidth
            value={dadosFormulario.proprietario}
            disabled
            className={classes.resize}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={classes.resize} fullWidth>
            <InputLabel>Tipo de Contrato</InputLabel>
            <Select onChange={handleContrato}>
              <MenuItem value="Residencial">Residencial</MenuItem>
              <MenuItem value="Não Residencial">Não-Residencial</MenuItem>
              <MenuItem value="Temporada">Temporada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepOne;

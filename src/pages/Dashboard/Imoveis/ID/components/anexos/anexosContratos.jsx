import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  IconButton,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { API_URL } from "../../../../../../db/Api";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 150,
    margin: theme.spacing(0.5),
    position: "relative",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  media: {
    height: 150,
  },
  addButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  imageContainer: {
    position: "relative",
  },
  input: {
    display: "none",
  },
}));

function AnexosContrato({ contratos }) {
  const [listaContratos, setListaContratos] = useState(
    contratos?.listaContratos
  );
  const [novoContrato, setNovoContrato] = useState(null);

  const classes = useStyles();
  
  const handleAddContrato = async () => {
    try {
      if (!novoContrato) {
        return;
      }
      console.log(contratos.idImovel)
      console.log(contratos.listaContratos)
      console.log(listaContratos)
      const formData = new FormData();

      formData.append("imovelId", contratos.idImovel.toString());
      listaContratos.forEach((contratos) => {
        formData.append("listaContratos", contratos.listaContratos);
      });

      formData.append("listaContratos", novoContrato);

      const response = await API_URL.post(
        "/adicionar-para-contratos-imovel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const contratoAdicionado = response.data.contratos;
      setListaContratos(contratoAdicionado);
      setNovoContrato(null);
      console.log(contratoAdicionado)

      toast.success("Contrato adicionada com sucesso!");
    } catch (error) {
      toast.error("Erro ao adicionar contrato. Tente novamente.");
    }
  };

  const handleDeleteContrato = async (imovelId, contratoId) => {
    try {
      const response = await API_URL.delete("/remover-contratos-imovel", {
        data: {
          imovelId: imovelId,
          contratoId: contratoId,
        },
      });

      if (response.status === 200) {
        setListaContratos((prevLista) =>
          prevLista.filter((contrato) => contrato.id !== contratoId)
        );

        toast.success("Contrato excluído com sucesso!");
      } else {
        console.error(
          "Erro ao excluir contrato. Status da resposta:",
          response.status
        );
        toast.error("Erro ao excluir contrato. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
      toast.error("Erro ao excluir contrato. Tente novamente.");
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Anexos de Contratos de prestação de serviço:
      </Typography>
      <Grid container spacing={2}>
        {listaContratos?.map((contrato, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper elevation={0} className={classes.card}>
              <div className={classes.imageContainer}>
                <IconButton
                  className={classes.deleteButton}
                  onClick={() =>
                    handleDeleteContrato(contratos.idImovel, contrato.id)
                  }
                >
                  <DeleteIcon />
                </IconButton>
                <a
                  href={contrato?.url} // Coloque a URL do contrato como href
                  target="_blank" // Abra o link em uma nova guia
                  rel="noopener noreferrer" // Adicione esses atributos para segurança
                  className={classes.linkStyle} // Estilize o link conforme necessário
                >
                  {`Contrato ${contrato?.id}`}{" "}
                  {/* Exiba um texto descritivo, se necessário */}
                </a>
              </div>
            </Paper>
          </Grid>
        ))}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <input
              className={classes.input}
              id="contained-contratos-file"
              type="file"
              accept="application/pdf"
              onChange={(e) => setNovoContrato(e.target.files[0])}
            />
            <label htmlFor="contained-contratos-file">
              <Button variant="contained" component="span">
                Selecione um Contrato
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              className={classes.addButton}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddContrato}
              fullWidth
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AnexosContrato;

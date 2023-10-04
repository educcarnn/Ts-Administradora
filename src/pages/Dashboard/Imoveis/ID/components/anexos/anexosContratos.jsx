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
import { Delete as DeleteIcon } from "@mui/icons-material";
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

  const classes = useStyles();

  const handleAddContrato = async (novoContrato) => {
    try {
      if (!novoContrato) {
        return;
      }

      const formData = new FormData();

      formData.append("imovelId", contratos.idImovel.toString());
      listaContratos.forEach((contrato) => {
        formData.append("listaContratos", contrato.listaContratos);
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

      toast.success("Contrato adicionado com sucesso!");
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

  const handleFileChange = (event) => {
    const novoContrato = event.target.files[0];
    handleAddContrato(novoContrato);
  };
  console.log(listaContratos.length);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Anexos de Contratos de prestação de serviço:
      </Typography>
      <Grid container spacing={2}>
        {listaContratos.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">(Sem contratos)</Typography>
          </Grid>
        ) : (
          listaContratos.map((contrato, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper elevation={3} className={classes.card}>
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
                    href={contrato?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.linkStyle}
                  >
                    {`Contrato ${contrato?.id}`}
                  </a>
                </div>
              </Paper>
            </Grid>
          ))
        )}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <input
            className={classes.input}
            id="contained-contratos-file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-contratos-file">
            <Button
              variant="contained"
              component="span"
              className={classes.addButton}
            >
              Selecione um Contrato
            </Button>
          </label>
        </Grid>
      </Grid>
    </>
  );
}

export default AnexosContrato;

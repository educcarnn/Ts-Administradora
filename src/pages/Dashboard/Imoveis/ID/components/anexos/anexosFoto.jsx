import React, { useState } from "react";
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
import { API_URL } from "../../../../../../db/Api";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

function AnexosFoto({ fotos }) {
  const [listaFotos, setListaFotos] = useState(fotos.listaFotos);

  const classes = useStyles();

  const handleAddFoto = async (novaFoto) => {
    try {
      if (!novaFoto) {
        return;
      }

      const formData = new FormData();
      formData.append("imovelId", fotos.idImovel.toString());
      listaFotos.forEach((foto) => {
        formData.append("listaFotos", foto.listaFotos);
      });
      formData.append("listaFotos", novaFoto);

      const response = await API_URL.post("/adicionar-fotos-imovel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fotoAdicionada = response.data.fotos;
      console.log(response);
      setListaFotos(fotoAdicionada);

      toast.success("Foto adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar foto:", error);
      toast.error("Erro ao adicionar foto. Tente novamente.");
    }
  };

  const handleDeleteFoto = async (imovelId, fotoId) => {
    try {
      const body = {
        imovelId: imovelId,
        fotoId: fotoId,
      };

      const response = await API_URL.delete("/remover-fotos-imovel", {
        data: body,
      });

      if (response.status === 200) {
        setListaFotos((prevLista) =>
          prevLista.filter((foto) => foto.id !== fotoId)
        );

        toast.success("Foto excluída com sucesso!");
      } else {
        console.error(
          "Erro ao excluir foto. Status da resposta:",
          response.status
        );
        toast.error("Erro ao excluir foto. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir foto:", error);
      toast.error("Erro ao excluir foto. Tente novamente.");
    }
  };

  const handleFileChange = (event) => {
    const novaFoto = event.target.files[0];
    handleAddFoto(novaFoto);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Anexos de Fotos:
      </Typography>
      <Grid container spacing={2}>
        {listaFotos.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6">(Sem fotos)</Typography>
          </Grid>
        ) : (
          listaFotos.map((foto, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper elevation={3} className={classes.card}>
                <div className={classes.imageContainer}>
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleDeleteFoto(fotos.idImovel, foto.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <CardMedia
                    component="img"
                    alt={`Foto ${foto?.id}`}
                    image={foto?.url}
                    className={classes.media}
                  />
                </div>
              </Paper>
            </Grid>
          ))
        )}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <input
            className={classes.input}
            id="contained-fotos-file"
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-fotos-file">
            <Button
              variant="contained"
              component="span"
              className={classes.addButton}
            >
              Selecione uma Foto
            </Button>
          </label>
        </Grid>
      </Grid>
    </>
  );
}

export default AnexosFoto;

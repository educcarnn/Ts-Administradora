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
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../../../../db/Api";
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

function Anexos({ anexos }) {
  console.log(anexos.anexos);
  const [listaAnexos, setListaAnexos] = useState(anexos.anexos || []);
  const [novoAnexo, setNovoAnexo] = useState(null);

  useEffect(() => {
    console.log("Lista de Anexos Atualizada:", listaAnexos);
  }, [listaAnexos]);
  const classes = useStyles();

  const handleAddAnexo = async () => {
    try {
      if (!novoAnexo) {
        return;
      }
      const formData = new FormData();

      formData.append("pessoaFisicaId", anexos.id);
      listaAnexos.forEach((anexo) => {
        formData.append("listaAnexosFisica", anexo.listaAnexosFisica);
      });
      formData.append("listaAnexosFisica", novoAnexo);

      const response = await API_URL.post(
        "/adicionar-anexo-pessoa-fisica",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const anexoAdicionado = response.data.anexos;

      setListaAnexos(anexoAdicionado);
      setNovoAnexo(null);

      toast.success("Anexo adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar anexo:", error);
      toast.error("Erro ao adicionar anexo. Tente novamente.");
    }
  };

  const handleDeleteAnexo = async (pessoaFisicaId, anexoId) => {

    try {
      const body = {
        pessoaFisicaId: pessoaFisicaId,
        anexoId: anexoId,
      };

      const response = await API_URL.delete("/remover-anexo-pessoa-fisica", {
        data: body,
      });

      if (response.status === 200) {
        setListaAnexos((prevLista) =>
          prevLista.filter((anexo) => anexo.id !== anexoId)
        );

        toast.success("Anexo excluído com sucesso!");
      } else {
        console.error(
          "Erro ao excluir anexo. Status da resposta:",
          response.status
        );
        toast.error("Erro ao excluir anexo. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao excluir anexo:", error);
      toast.error("Erro ao excluir anexo. Tente novamente.");
    }
  };

  console.log(listaAnexos);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Anexos
      </Typography>
      <Grid container spacing={2}>
        {listaAnexos?.map((anexo, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper elevation={0} className={classes.card}>
              <div className={classes.imageContainer}>
                <IconButton
                  className={classes.deleteButton}
                  onClick={() => handleDeleteAnexo(anexos.id, anexo.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  alt={`Anexo ${anexo?.id}`}
                  image={anexo?.url}
                  className={classes.media}
                />
              </div>
            </Paper>
          </Grid>
        ))}

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={10}>
            <input
              className={classes.input}
              id="contained-anexos-file"
              type="file"
              accept="image/jpeg"
              onChange={(e) => setNovoAnexo(e.target.files[0])}
            />
            <label htmlFor="contained-anexos-file">
              <Button variant="contained" component="span">
                Selecione um Anexo
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              className={classes.addButton}
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddAnexo}
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

export default Anexos;

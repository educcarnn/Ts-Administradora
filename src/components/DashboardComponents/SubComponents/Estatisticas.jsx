import React, { useState, useEffect } from "react";
import { Grid, LinearProgress, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../../db/Api";
import videoBackground from "../../../assets/Videos/principal.mp4";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
    position: "relative",
    overflow: "hidden",
    zIndex: 2,
    height: '100vh',
  },
  reportTitle: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  progress: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  number: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  videoBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  },
}));

function Estatisticas() {
  const classes = useStyles();

  const [imoveis, setImoveis] = useState(0);
  const [contratos, setContratos] = useState(0);
  const [pessoas, setPessoas] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/obter-imoveis-novo`)
      .then((res) => res.json())
      .then((data) => setImoveis(data.length))
      .catch((error) => console.error("Erro ao buscar imóveis:", error));

    fetch(`${API_URL}/obter-contratos-novo`)
      .then((res) => res.json())
      .then((data) => setContratos(data.length))
      .catch((error) => console.error("Erro ao buscar contratos:", error));

    fetch(`${API_URL}/obter-novas-pessoas`)
      .then((res) => res.json())
      .then((data) => setPessoas(data.length))
      .catch((error) => console.error("Erro ao buscar pessoas:", error));
  }, []);

  return (
    <div className={classes.root}>
      <video
        autoPlay
        loop
        muted
        className={classes.videoBackground}
        src={videoBackground}
      ></video>
      <Typography variant="h6" className={classes.reportTitle}>
        Relatórios
      </Typography>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {[
          { label: "Imóveis", value: imoveis },
          { label: "Contratos", value: contratos },
          { label: "Pessoas", value: pessoas },
        ].map((item, index) => (
          <Grid item xs={4} key={index}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{item.label}</Typography>
              <LinearProgress
                variant="determinate"
                value={item.value}
                className={classes.progress}
              />
              <Typography className={classes.number}>{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Estatisticas;

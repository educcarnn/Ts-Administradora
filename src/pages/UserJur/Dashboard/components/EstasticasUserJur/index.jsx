import React, { useState, useEffect } from "react";
import { Grid, LinearProgress, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../../../../../db/Api";
import videoBackground from "../../../../../assets/Videos/principal.mp4";
import { useJwt } from "react-jwt";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
    position: "relative",
    overflow: "hidden",
    zIndex: 2,
    height: "100vh",
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

function EstatisticasUserJur() {
  const classes = useStyles();

  const [imoveis, setImoveis] = useState(0);

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);

  useEffect(() => {
    const buscarDadosPessoa = async () => {
      try {
        if (decodedToken && decodedToken.userId) {
          const responsePessoa = await API_URL.get(
            `/pessoa-juridica/${decodedToken.userId}`
          );
          const pessoaData = responsePessoa?.data?.imoveisRelacionadosJur?.length;
         
          setImoveis(pessoaData);
        } else {
          console.error(
            "Token não contém ID do usuário ou não foi decodificado corretamente."
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados da pessoa:", error);
      }
    };

    buscarDadosPessoa();
  }, [decodedToken]);
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
        {[{ label: "Imóveis", value: imoveis }].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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

export default EstatisticasUserJur;

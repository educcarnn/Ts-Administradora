import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { Link } from "react-router-dom"; // Importe o Link do React Router.
import telaLogin from "../../../src/assets/Videos/telaLogin.mp4";
import logo from "../../../src/assets/logo-tsadministradora.png"; // Importe o logotipo da sua empresa.

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "#ffffff",
    overflow: "hidden",
    position: "relative",
  },
  video: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  content: {
    textAlign: "center",
    zIndex: "1",
    animation: "$fadeInUp 1.5s ease-in-out",
    overflow: "auto", // Adicionando overflow automático.
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#007bff",
    color: "#ffffff",
  },
  logo: {
    width: "200px", // Ajuste o tamanho do logotipo conforme necessário.
    marginBottom: theme.spacing(2),
  },
  card: {
    backgroundColor: "rgb(229 229 229 / 74%)",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra do card.
  },
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(50px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <video className={classes.video} autoPlay muted loop>
        <source src={telaLogin} type="video/mp4" />
        Seu navegador não suporta vídeo HTML5.
      </video>
      <div className={classes.content}>
        <img
          src={logo}
          alt="Logo da TS Administradora"
          className={classes.logo}
        />

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Bem-vindo à TS Administradora
            </Typography>
            <Typography variant="body1">
              Quer trazer seus imóveis para a nossa solução tecnológica? Nós
              oferecemos serviços acessíveis respaldados por décadas de
              experiência no mercado imobiliário.
            </Typography>

            <Typography variant="body1">
              Nossa equipe de profissionais experientes está comprometida em
              ajudar sua empresa a alcançar seus objetivos no setor imobiliário.
              Oferecemos soluções adaptadas ao seu orçamento e projetadas para
              otimizar o desempenho dos seus ativos.
            </Typography>

            <Typography variant="body1">
              Com um histórico comprovado de sucesso, nossa administradora traz
              a expertise necessária para enfrentar desafios e aproveitar
              oportunidades.
            </Typography>

            <Typography variant="body1">
              Estamos aqui para simplificar o processo e maximizar o retorno
              sobre seu investimento imobiliário. 
            </Typography>
            <Typography variant="body1">
              Para mais informações, entre em contato conosco pelo telefone:
              <a href="tel:+552130302696">(21) 3030-2696</a>
            </Typography>
          </CardContent>
        </Card>

        {/* Use o componente Link para redirecionar para a página de login */}
        <Link to="/login">
          <Button variant="contained" className={classes.button}>
            Faça login na plataforma
          </Button>
        </Link>
      </div>
    </div>
  );
}

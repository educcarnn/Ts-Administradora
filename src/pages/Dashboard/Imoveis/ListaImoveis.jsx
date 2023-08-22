import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../style";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  filtro: {
    marginBottom: theme.spacing(3),
  },
  imovelCard: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
  },
}));

function ListaImoveis() {
  const classes = useStyles();
  const [imoveis, setImoveis] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch(`${API_URL}/obter-imoveis-novo`);
        const data = await response.json();
        setImoveis(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };
    fetchImoveis();
  }, []);
  const filteredImoveis = imoveis.filter((imovel) => {
    {
      console.log(filtro);
    }
    {
      console.log(imoveis);
    }
    return (
      imovel.id.toString().includes(filtro) ||
      (imovel.pessoas &&
        imovel.pessoas.some((pessoa) =>
          pessoa.nome.toLowerCase().includes(filtro.toLowerCase())
        )) ||
      (imovel.localizacao && imovel.localizacao.endereco.includes(filtro))
    );
  });
  return (
    <div>
      <DashboarDiv>TS Administradora - Imóveis</DashboarDiv>
      <Container className={classes.root}>
        <div className={classes.filtro}>
          <TextField
            label="Pesquisar"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <Grid container spacing={2}>
          {filteredImoveis.map((imovel) => (
            <Grid item xs={12} key={imovel.id}>
              <Card className={classes.imovelCard}>
                <CardContent>
                  <Typography variant="h6">
                    {/* Adicione um link para a página de detalhes */}
                    <Link to={`/imovel/${imovel.id}`}>
                      {`Imóvel #${imovel.id}`}
                    </Link>
                  </Typography>
                  <div>
                    {imovel.pessoas.map((pessoa) => (
                      <Typography
                        key={pessoa.id}
                      >{`Proprietário: ${pessoa.nome} reside em ${pessoa.endereco.endereco }, ${pessoa.endereco.estado} ${pessoa.endereco.cep} / Identificação CPF: ${pessoa.cpf}`}</Typography>
                    ))}
                  </div>
                  <Typography>{`Localização Imóvel: ${imovel.localizacao.endereco}, ${imovel.localizacao.numero} Andar: ${imovel.localizacao.andar} Cidade ${imovel.localizacao.estado}  CEP: ${imovel.localizacao.cep} `}</Typography>
                  {/*
                       <Typography>{`Características: Área Total: ${imovel.caracteristicas.areaTotal} m², Quartos: ${imovel.caracteristicas.numeroQuartos}, Banheiros: ${imovel.caracteristicas.numeroBanheiros}`}</Typography>
                  */}
             
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ListaImoveis;

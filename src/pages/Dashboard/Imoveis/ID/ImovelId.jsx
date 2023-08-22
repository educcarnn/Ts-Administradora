import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { API_URL } from "../../../../db/Api";
import { DashboarDiv } from "../style";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    maxWidth: 500,
    width: "100%",
    padding: theme.spacing(2),
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "1.25rem",
    marginBottom: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(1),
  },
}));

export default function ImovelCaracteristicas() {
  const classes = useStyles();
  const { id } = useParams(); // Recupera o ID da URL

  const [imovel, setImovel] = useState(null);

  useEffect(() => {
    // Busca as informações completas do imóvel usando o ID
    const fetchImovelPorId = async () => {
      try {
        const response = await fetch(`${API_URL}/obter-imovel/${id}`);
        const data = await response.json();
        setImovel(data);
      } catch (error) {
        console.error("Erro ao buscar imóvel por ID:", error);
      }
    };
    fetchImovelPorId();
  }, [id]);

  return (
    <div>
      <DashboarDiv>TS Administradora</DashboarDiv>
      <div className={classes.container}>
        {imovel && (
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
              >{`Detalhes do Imóvel #${imovel.id}`}</Typography>
              <Typography
                className={classes.info}
              >{`Localização: ${imovel.localizacao.endereco}`}</Typography>
              {imovel.caracteristicas && (
                <>
                  <Typography
                    className={classes.info}
                  >{`Área Total: ${imovel.caracteristicas.areaTotal} m²`}</Typography>
                  <Typography
                    className={classes.info}
                  >{`Quartos: ${imovel.caracteristicas.numeroQuartos}`}</Typography>
                  <Typography
                    className={classes.info}
                  >{`Banheiros: ${imovel.caracteristicas.numeroBanheiros}`}</Typography>
                </>
              )}
              <Typography
                className={classes.info}
              >{`Tipo de Negociação: ${imovel.negociacao.tipo}`}</Typography>
              <Typography
                className={classes.info}
              >{`Valor de Venda: R$ ${imovel.negociacao.valores.valorVenda}`}</Typography>
              {/* Adicione mais informações conforme necessário */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

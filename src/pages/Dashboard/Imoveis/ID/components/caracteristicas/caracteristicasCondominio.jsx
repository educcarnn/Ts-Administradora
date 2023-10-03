import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  List,
  ListItem,
  Grid,
  Box,
} from "@mui/material";
import styled from "styled-components";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

export default function CheckboxCaracteristicasCondominio({
  caracteristicasCondominio,
  handleCaracteristicasCondominio,
  isEditing,
}) {
  // Defina grupos para suas características
  const gruposCaracteristicas = {
    lazerEsporte: {
      titulo: "Lazer e Esporte",
      caracteristicas: [
        "Academia",
        "Churrasqueira",
        "Cinema",
        "EspaçoGourmet",
        "Jardim",
        "Piscina",
        "Playground",
        "QuadraSquash",
        "QuadraTenis",
        "QuadraPoliesportiva",
        "SalaoFestas",
        "SalaoJogos",
      ],
    },
    comodidadesServicos: {
      titulo: "Comodidades e Serviços",
      caracteristicas: [
        "AcessoDeficientes",
        "Bicicletário",
        "Coworking",
        "Elevador",
        "Lavanderia",
        "Sauna",
        "SPA",
      ],
    },
    seguranca: {
      titulo: "Segurança",
      caracteristicas: ["CondomínioFechado", "PortãoEletrônico", "Portaria24h"],
    },
  };

  const [checkboxState, setCheckboxState] = useState({});


  useEffect(() => {
    if (caracteristicasCondominio) {
      setCheckboxState(caracteristicasCondominio);
    }
  }, [caracteristicasCondominio]);

  const handleCheckboxChange = (name) => {

    handleCaracteristicasCondominio(
      name,
      !caracteristicasCondominio?.caracteristicas_condominio?.includes(name)
    );
  };

  return (
    <div>
      <Box marginTop={2}>
        <CenteredDiv>
          <TextPage variant="h6">Características do Condomínio:</TextPage>
          <FormControl component="fieldset">
            <FormGroup>
              <Grid container spacing={2}>
                {Object.keys(gruposCaracteristicas).map((grupo) => (
                  <Grid item xs={12} sm={6} md={4} key={grupo}>
                    <div>
                      <Typography variant="subtitle1">
                        {gruposCaracteristicas[grupo].titulo}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        {gruposCaracteristicas[grupo].caracteristicas.map(
                          (caracteristica) => (
                            <FormControlLabel
                              key={caracteristica}
                              control={
                                <Checkbox
                                  name={caracteristica}
                                  onChange={() =>
                                    handleCheckboxChange(caracteristica)
                                  }
                                  checked={caracteristicasCondominio?.caracteristicas_condominio?.includes(
                                    caracteristica
                                  )}
                                  disabled={!isEditing}
                                />
                              }
                              label={caracteristica
                                .split(/(?=[A-Z])/)
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>
        </CenteredDiv>
      </Box>
    </div>
  );
}

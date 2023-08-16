import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import axios from "axios";
import { DashboarDiv } from "../style";

const API_URL = "https://tsadministradora.onrender.com";

const PropertyCard = ({ property }) => {
  return (
    <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
      <Typography variant="h6" gutterBottom>
        {property.tipo_imovel} - {property.genero_imovel}
      </Typography>
      <Typography variant="body1">
        Número de Quartos: {property.numero_quartos}
      </Typography>
      <Typography variant="body1">
        Número de Suítes: {property.numero_suites}
      </Typography>
      <Typography variant="body1">
        Número de Banheiros: {property.numero_banheiros}
      </Typography>
      <Typography variant="body1">
        Número de Vagas: {property.numero_vagas}
      </Typography>
      <Typography variant="body1">
        Área Útil: {property.area_util} m²
      </Typography>
      <Typography variant="body1">
        Área Total: {property.area_total} m²
      </Typography>
      <Typography variant="body1">
        Tipo de Negociação: {property.tipo_negociacao}
      </Typography>
      <Typography variant="body1">
        Valor de Venda: R$ {property.valor_venda}
      </Typography>
    </Paper>
  );
};

const PropertyListView = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/obter-imoveis-cadastrados`).then((response) => {
      setProperties(response.data);
    });
  }, []);

  return (
    <div>
      <DashboarDiv>
        <div>TS Administradora - Lista de Imóveis Cadastrados</div>
      </DashboarDiv>
      <div style={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PropertyListView;

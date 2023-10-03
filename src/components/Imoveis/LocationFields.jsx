import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField } from "@material-ui/core";
import axios from "axios";
import { useFormularioContext } from "../../context/CadastroProvider";
import * as mapboxgl from "mapbox-gl";
import { FormLabel } from "@material-ui/core";
import "mapbox-gl/dist/mapbox-gl.css"; // Adicionar estilos do Mapbox
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gap: "5%",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    borderRadius: "5px", // Adicione o estilo de borda para torná-lo um quadrado
  },
  containerBlock: {
    display: "flex",
    marginBottom: "2%",
    flexDirection: "column",
    alignItems: "center",
  },
  "@media (max-width: 800px)": {
    container: {},
  },
}));

const StyledContainer = styled(Container)`
  margin: 0 auto;
  display: flex;
  background-color: blue;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;

  .text {
    color: black;
  }

  .textLocation {
    color: black;
  }
`;

const LocationFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaçamento vertical entre os campos */
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

export const LocationFields = () => {
  const classes = useStyles();
  const mapContainer = React.useRef(null);

  const [map, setMap] = useState(null);

  const { register, setValue } = useFormularioContext();

  const fetchAddressData = async (cep, setValue) => {
    try {
      if (cep.length === 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        setValue("localizacao.bairro", response.data.bairro);
        setValue("localizacao.cidade", response.data.localidade);
        setValue("localizacao.estado", response.data.uf);
        setValue("localizacao.endereco", response.data.logradouro);


        const addressString = `${response.data.logradouro}, ${response.data.localidade}, ${response.data.uf}, Brasil`;
        const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          addressString
        )}.json?access_token=${mapboxgl.accessToken}`;

        const geoResponse = await axios.get(geocodingUrl);
        const coords = geoResponse.data.features[0].geometry.coordinates;

       
        map.flyTo({ center: coords, zoom: 15 });
      } else {
        console.error("CEP inválido:", cep);
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  useEffect(() => {
    if (!map) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZWR1Y2MiLCJhIjoiY2xsbzY3dnp4MDZzZjNjbXc2NXdtcXhjeiJ9.sPpBYDyPhP7vH-muzYQmGA";

      const initializeMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-51.9253, -14.235],
        zoom: 4,
      });

      setMap(initializeMap);
    }
  }, [map]);

  return (
    <div className={classes.containerBlock}>
      <TextPage>Localização</TextPage>
      <TextField
        label="CEP"
        variant="outlined"
        fullWidth
        required
        className={classes.containerBlock}
        {...register("localizacao.cep")}
        onChange={(event) => {
          const cepValue = event.target.value;
          if (cepValue.length === 8) {
            fetchAddressData(cepValue, setValue);
          }
        }}
      />
      <Container>
        <FormLabel>Endereço</FormLabel>
        <TextField
          variant="outlined"
          disabled
          fullWidth
          className={classes.containerBlock}
          {...register("localizacao.endereco")}
        />

        <FormLabel>Bairro</FormLabel>
        <TextField
          variant="outlined"
          disabled
          fullWidth
          className={classes.containerBlock}
          {...register("localizacao.bairro")}
        />
        <FormLabel>Cidade</FormLabel>

        <TextField
          variant="outlined"
          disabled
          fullWidth
          className={classes.containerBlock}
          {...register("localizacao.cidade")}
        />
        <FormLabel>Estado</FormLabel>
        <TextField
          variant="outlined"
          disabled
          fullWidth
          className={classes.containerBlock}
          {...register("localizacao.estado")}
        />
      </Container>
      <TextField
        label="Complemento"
        variant="outlined"
        fullWidth
        required
        className={classes.containerBlock}
        {...register("localizacao.andar")}
      />
      <TextField
        label="N°"
        variant="outlined"
        fullWidth
        required
        className={classes.containerBlock}
        {...register("localizacao.numero")}
      />

      <div style={{ width: "100%", height: "300px" }} ref={mapContainer}></div>
    </div>
  );
};

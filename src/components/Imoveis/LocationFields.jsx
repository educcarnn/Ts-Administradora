import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField } from "@material-ui/core";
import axios from "axios";
import { useFormularioContext } from "../../context/CadastroProvider";
import * as mapboxgl from "mapbox-gl";

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

  const { dadosFormulario, setDadosFormulario } = useFormularioContext(); // Use o contexto adequado

  const fetchAddressData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = {
        cep: response.data.cep,
        endereco: response.data.logradouro || "",
        bairro: response.data.bairro || "",
        cidade: response.data.localidade || "",
        estado: response.data.uf || "",
      };

      setDadosFormulario((prevData) => ({
        ...prevData,
        localizacao: {
          ...prevData.localizacao,
          ...addressData,
        },
      }));

      // Geocodificação usando a API do Mapbox
      const addressString = `${addressData.endereco}, ${addressData.cidade}, ${addressData.estado}, Brasil`;
      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        addressString
      )}.json?access_token=${mapboxgl.accessToken}`;

      const geoResponse = await axios.get(geocodingUrl);
      const coords = geoResponse.data.features[0].geometry.coordinates;

      // Atualize o mapa para centralizar nas coordenadas obtidas
      map.flyTo({ center: coords, zoom: 15 });
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

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        cep: newCep,
      },
    }));
  };

  const handleEnderecoChange = (event) => {
    const newEndereco = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        endereco: newEndereco,
      },
    }));
  };

  const handleBairroChange = (event) => {
    const newBairro = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        bairro: newBairro,
      },
    }));
  };

  const handleCidadeChange = (event) => {
    const newCidade = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        cidade: newCidade,
      },
    }));
  };

  const handleEstadoChange = (event) => {
    const newEstado = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        estado: newEstado,
      },
    }));
  };

  const handleAndarChange = (event) => {
    const newAndar = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        andar: newAndar,
      },
    }));
  };

  const handleNumeroChange = (event) => {
    const newNumero = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        numero: newNumero,
      },
    }));
  };
  return (
    <div className={classes.containerBlock}>
      <TextPage>Localização</TextPage>
      <TextField
        label="CEP"
        variant="outlined"
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.cep || ""}
        onChange={handleCepChange}
        onBlur={(event) => fetchAddressData(event.target.value)}
      />
      <TextField
        label="Endereço"
        variant="outlined"
        disabled
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.endereco || ""}
        onChange={handleEnderecoChange}
      />
      <TextField
        label="Bairro"
        variant="outlined"
        disabled
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.bairro || ""}
        onChange={handleBairroChange}
      />
      <Container className={classes.container}>
        <TextField
          label="Cidade"
          variant="outlined"
          fullWidth
          disabled
          className={classes.containerBlock}
          value={dadosFormulario.localizacao.cidade || ""}
          onChange={handleCidadeChange}
        />
        <TextField
          label="Estado"
          variant="outlined"
          disabled
          fullWidth
          className={classes.containerBlock}
          value={dadosFormulario.localizacao.estado || ""}
          onChange={handleEstadoChange}
        />
      </Container>
      <TextField
        label="Complemento"
        variant="outlined"
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.andar || ""}
        onChange={handleAndarChange}
      />
      <TextField
        label="N°"
        variant="outlined"
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.numero || ""}
        onChange={handleNumeroChange}
      />
      <div style={{ width: "100%", height: "300px" }} ref={mapContainer}></div>
    </div>
  );
};

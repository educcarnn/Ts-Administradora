import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField } from "@material-ui/core";
import axios from "axios";


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
  const [addressData, setAddressData] = useState({});

  const fetchAddressData = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddressData(response.data);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  return (
      <div className={classes.containerBlock}>
        <TextPage>Localização</TextPage>
        <TextField
          label="CEP"
          variant="outlined"
          fullWidth
          className={classes.containerBlock}
          onChange={(event) => fetchAddressData(event.target.value)}
        />
        <TextField
          label="Endereço"
          variant="outlined"
          fullWidth
          className={classes.containerBlock}
          value={addressData.logradouro || ""}
        />
        <TextField
          label="Bairro"
          variant="outlined"
          fullWidth
          className={classes.containerBlock}
          value={addressData.bairro || ""}
        />
        <Container className={classes.container}>
          <TextField
            label="Cidade"
            variant="outlined"
            fullWidth
            className={classes.containerBlock}
            value={addressData.localidade || ""}
          />
          <TextField
            label="Estado"
            variant="outlined"
            fullWidth
            className={classes.containerBlock}
            value={addressData.uf || ""}
          />
        </Container>
        <Container className={classes.container}>
          <TextField
            label="Andar"
            variant="outlined"
            fullWidth
            className={classes.containerBlock}
          />
          <TextField
            label="N°"
            variant="outlined"
            fullWidth
            className={classes.containerBlock}
          />
        </Container>
    </div>
  );
};

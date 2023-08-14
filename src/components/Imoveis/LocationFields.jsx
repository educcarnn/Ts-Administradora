import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gap: "5%",
    alignItems: "flex-start",
    flexDirection: "row",
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

const StyledFormBox = styled.form``;

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
  return (
    <div className={classes.containerBlock}>
      <TextPage>Localização</TextPage>
      <StyledFormBox>
        <TextField label="CEP" placeholder="CEP" fullWidth />
      </StyledFormBox>
      <StyledFormBox>
        <TextField label="Endereço" placeholder=" Endereço" fullWidth />
      </StyledFormBox>
      <StyledFormBox>
        <TextField label="Bairro" placeholder="Bairro" fullWidth />
      </StyledFormBox>
      <Container className={classes.container}>
        <StyledFormBox>
          <TextField label="Cidade" placeholder="Cidade" fullWidth />
        </StyledFormBox>
        <StyledFormBox>
          <TextField label="Estado" placeholder="Estado" fullWidth />
        </StyledFormBox>
      </Container>
      <Container className={classes.container}>
        <StyledFormBox>
          <TextField label="Andar" placeholder="Andar" fullWidth />
        </StyledFormBox>
        <StyledFormBox>
          <TextField label="N°" placeholder="N°" fullWidth />
        </StyledFormBox>
      </Container>
    </div>
  );
};

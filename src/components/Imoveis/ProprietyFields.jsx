import React, { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

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
    color: white;
  }

  .textLocation {
    color: black;
  }
`;

const StyledFormBox = styled.form`
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledFileInput = styled.input`
  margin-top: 10px;
`;

const StyledProprietyPercent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4%;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;

`

const StyledLocationBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const ProprietyFields = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <StyledProprietyPercent>
        <TextPage variant="h5" className="textLocation" gutterBottom>
          Proprietário
        </TextPage>
        <TextField label="Nome do proprietário" placeholder="Nome do proprietário" fullWidth />
        <Typography variant="body1" className="text">
          Proprietário(%)
        </Typography>
        <TextField label="Porcentagem do proprietário(%)" placeholder="Porcentagem do proprietário(%)" fullWidth />
      </StyledProprietyPercent>

      <Button variant="contained" color="primary">
        Adicionar
      </Button>
    </div>
  );
};

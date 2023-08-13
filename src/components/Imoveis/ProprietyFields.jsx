import React, { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const StyledProprietyFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;

  .fieldWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .fieldWrapperLabel {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .addButton {
    margin-top: 10px;
  }
`;

const ProprietyFields = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`

  return (
    <StyledProprietyFields>
      <TextPage>
        Proprietário
      </TextPage>

      <div className="fieldWrapper">
        <Typography variant="body1">Proprietários</Typography>
        <TextField placeholder="Advindos do banco de dados" fullWidth />
      </div>
      <div className="fieldWrapper">
        <Typography variant="body1">Proprietário(%)</Typography>
        <TextField placeholder="Percentual" fullWidth />
      </div>

      <Button variant="contained" color="primary" className="addButton">
        Adicionar
      </Button>
    </StyledProprietyFields>
  );
};

export default ProprietyFields;

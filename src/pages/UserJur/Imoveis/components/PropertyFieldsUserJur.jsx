import React, { useState, useEffect } from "react";
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
import { API_URL } from "../../../../db/Api";
import { useFormularioContext } from "../../../../context/CadastroProvider";
import { useJwt } from "react-jwt";

const StyledProprietyFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

const ProprietyFieldsUser = () => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [owners, setOwners] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { dadosFormulario, setDadosFormulario, setPerson } =
    useFormularioContext();

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token || "");

  useEffect(() => {
    if (decodedToken && decodedToken.userId) {
      async function fetchOwners() {
        try {
        
          const response = await API_URL.get(`/pessoa/${decodedToken.userId}`);
   
          setOwners(response.data);
          
          const ownerId = response.data.id; // Pegue o ID do proprietário do response
          setSelectedOwner(ownerId); 
          setPerson(ownerId);
          setDadosFormulario((prevData) => ({
            ...prevData,
            pessoaId: ownerId,
          }));

        } catch (error) {
          console.error("Erro ao buscar proprietários:", error);
        }
      }

      fetchOwners();
    } else {
      console.error("Token decodificado não encontrado ou sem ID");
    }
  }, [decodedToken]);


  return (
    <StyledProprietyFields>
      <TextPage>Proprietário</TextPage>
      {owners ? (
        <FormControl fullWidth>
          <InputLabel>Proprietário</InputLabel>
          <Select value={selectedOwner} disabled>
            <MenuItem key={owners.id} value={owners.id}>
              {owners.nome}
            </MenuItem>
          </Select>
        </FormControl>
      ) : (
        <p>Carregando proprietário...</p>
      )}

      <div className="fieldWrapper">
        <Typography variant="body1">Proprietário(%)</Typography>
        <TextField
          label="Percentual"
          variant="outlined"
          type="text"
          value={100}
          disabled
          inputProps={{
            readOnly: true,
            style: { appearance: "textfield" },
        }}
          value={dadosFormulario?.proprietários?.percentual || ""}
          onChange={(event) => {
            const percentual = parseFloat(event.target.value);
            if (!isNaN(percentual)) {
              setDadosFormulario((prevData) => ({
                ...prevData,
                proprietários: {
                  ...prevData.proprietários,
                  percentual,
                },
              }));
            }
          }}
        />
      </div>
    </StyledProprietyFields>
  );
};

export default ProprietyFieldsUser;

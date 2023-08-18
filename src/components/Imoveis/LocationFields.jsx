import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField } from "@material-ui/core";
import axios from "axios";
import { useFormularioContext } from "../../context/CadastroProvider";

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
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setDadosFormulario((prevData) => ({
      ...prevData,
      localizacao: {
        ...prevData.localizacao,
        cep: newCep,
      },
    }));
    // Chamar a função fetchAddressData aqui se desejar buscar automaticamente o endereço pelo CEP
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
        fullWidth
        className={classes.containerBlock}
        value={dadosFormulario.localizacao.endereco || ""}
        onChange={handleEnderecoChange}
      />
      <TextField
        label="Bairro"
        variant="outlined"
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
          className={classes.containerBlock}
          value={dadosFormulario.localizacao.cidade || ""}
          onChange={handleCidadeChange}
        />
        <TextField
          label="Estado"
          variant="outlined"
          fullWidth
          className={classes.containerBlock}
          value={dadosFormulario.localizacao.estado || ""}
          onChange={handleEstadoChange}
        />
      </Container>
        <TextField
          label="Andar"
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
 
    </div>
  );
};

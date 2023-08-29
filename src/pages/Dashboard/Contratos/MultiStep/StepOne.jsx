import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";
import { API_URL } from "../../../../db/Api";
import { Label } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  resize: {
    resize: "none",
    width: "100%",
  },
  contentRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  newText: {
    display: "flex",
    flexDirection: "row",
  },
}));

const StepOne = () => {
  const classes = useStyles();
  const { setDadosFormulario, dadosFormulario } = useMultiStepContext();
  const [imoveis, setImoveis] = useState([]);
  const [selectedImovel, setSelectedImovel] = useState(null);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch(`${API_URL}/obter-imoveis-novo`);
        const data = await response.json();
        setImoveis(data);

        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };
    fetchImoveis();
  }, []);

  const handleImovelChange = (event) => {
    const selectedImovelId = event.target.value;
    setSelectedImovel(selectedImovelId);

    const selectedImovelData = imoveis.find(
      (imovel) => imovel.id === selectedImovelId
    );

    // Use a propriedade 'proprietario' em vez de 'pessoas'
    const proprietorName = selectedImovelData.proprietario?.id;
    const name = selectedImovelData.proprietario?.nome


    setDadosFormulario((prevData) => ({
      ...prevData,
      imovelId: selectedImovelId,
      proprietarioId: proprietorName,
      proprietario: name
    }));
  };

  const handleContrato = (event) => {
    const selectedContrato = event.target.value;

    // Update the form data with the selected contract type
    setDadosFormulario((prevData) => ({
      ...prevData,
      tipoContrato: selectedContrato,
    }));
  };

  return (
    <div className={classes.contentRow}>
      <FormControl className={classes.resize}>
        <InputLabel>Imóvel</InputLabel>
        <Select onChange={handleImovelChange}>
          {imoveis.map((imovel) => {
            if (imovel.contratos?.length === 0) {
              return (
                <MenuItem key={imovel.id} value={imovel.id}>
                  {imovel.id} - {imovel.generoImovel} no{" "}
                  {imovel.localizacao.bairro}, {imovel.localizacao.endereco} N°{" "}
                  {imovel.localizacao.numero}, CEP: {imovel.localizacao.cep}
                </MenuItem>
              );
            }
            return null; // Não renderiza nada se o imóvel tiver mais de um contrato
          })}
        </Select>
      </FormControl>
      <div>Proprietário</div>
      <TextField fullWidth value={dadosFormulario.proprietario} disabled />

      <FormControl className={classes.resize}>
        <InputLabel>Tipo de Contrato</InputLabel>
        <Select onChange={handleContrato}>
          <MenuItem value="residencial">Residencial</MenuItem>
          <MenuItem value="nao-residencial">Não-Residencial</MenuItem>
          <MenuItem value="temporada">Temporada</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default StepOne;

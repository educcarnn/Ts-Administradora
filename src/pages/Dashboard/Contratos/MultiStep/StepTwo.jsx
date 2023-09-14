import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMultiStepContext } from "../../../../context/MultiStepProvider";
import { API_URL } from "../../../../db/Api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    width: "50%",
    height: "50%",
  },
}));

const StepTwo = () => {
  const classes = useStyles();
  const { activeStep, dadosFormulario, setDadosFormulario } =
    useMultiStepContext();
  const [locatarios, setLocatarios] = useState([]);
  const [selectedLocatario, setSelectedLocatario] = useState("");

  useEffect(() => {
    if (activeStep === 1) {
      const fetchLocatarios = async () => {
        try {
          const response = await API_URL.get(`/obter-novas-pessoas`);
          setLocatarios(response.data);
        } catch (error) {
          console.error("Erro ao buscar locatários:", error);
        }
      };
      fetchLocatarios();
    }
  }, [activeStep]);

  const handleLocatarioChange = (event) => {
    const idSelecionado = event.target.value;
  
    setSelectedLocatario(idSelecionado);
    setDadosFormulario((prevData) => ({
      ...prevData,
      locatarioId: idSelecionado,
    }));
  };
  

  return (
    <Container className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel>Locatários</InputLabel>
        <Select value={selectedLocatario} onChange={handleLocatarioChange}>
          {locatarios
            .filter((locatario) => locatario.funcao.includes("Inquilino"))
            .map((locatario) => (
              <MenuItem key={locatario.id} value={locatario.id}>
                {locatario.id} - {locatario.nome}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
     
    </Container>
  );
};

export default StepTwo;

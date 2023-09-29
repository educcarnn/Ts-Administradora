import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormHelperText, // Importe FormHelperText para exibir a mensagem de erro
} from "@material-ui/core";
import styled from "styled-components";
import Venda from "./Venda/Venda";
import Aluguel from "./Aluguel/Aluguel";
import VendaAluguel from "./VendaAluguel/VendaAluguel";
import { useFormularioContext } from "../../../context/CadastroProvider";
import Negociacao from "../../../pages/Dashboard/Imoveis/ID/components/negociation/negociacao";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  flex-direction: column;
  color: "#FFFFFF";
  z-index: 1;
`;

const DivContainer = styled.div`
  width: 50%;
`;

export default function TipoNegociacao() {
  const { setValue, error, getValues } = useFormularioContext();
  const [radioError, setRadioError] = useState("");

  const camposDeVenda = [
    "negociacao[valores][valorVenda]",
    "negociacao[valores][taxaIntermediacao]",
  ];

  const camposDeAluguel = [
    "negociacao[valores][valorAluguel]",
    "negociacao[valores][taxaAdministracao]",
    "negociacao[valores][taxaLocacao]",
  ];

  const camposDeVendaEAluguel = [
    "negociacao[valores][vendaealuguelVenda]",
    "negociacao[valores][vendaealuguelAluguel]",
    "negociacao[valores][vendaealuguelTaxa]",
  ];

  const defaultOption = "";
  const [selectedOption, setSelectedOption] = useState(defaultOption); // Usando o valor padrão como inicial

  const [errorText, setErrorText] = useState(""); // Estado para controlar o erro

  const handleRadioChange = (event) => {
    const { value } = event.target;

    if (value === "venda") {
      camposDeAluguel.forEach((campo) => setValue(campo, "0"));
      camposDeVendaEAluguel.forEach((campo) => setValue(campo, "0"));
    } else if (value === "aluguel") {
      camposDeVenda.forEach((campo) => setValue(campo, "0"));
      camposDeVendaEAluguel.forEach((campo) => setValue(campo, "0"));
    } else if (value === "duasopcoes") {
      camposDeVenda.forEach((campo) => setValue(campo, "0"));
      camposDeAluguel.forEach((campo) => setValue(campo, "0"));
    }

    setSelectedOption(value);
    setValue("negociacao.tipo", value);
    setErrorText("");
  };
  const validateRadioSelection = () => {
    if (!selectedOption) {
      console.log("Por favor, selecione uma opção de negociação.");
    } else {
      setRadioError("");
    }
  };
  return (
    <CenterDiv>
      <FormControl component="fieldset" fullWidth margin="normal">
        <Typography variant="h6">Tipo de Negociação</Typography>
        <RadioGroup
          row
          value={selectedOption}
          onChange={handleRadioChange}
          name="tipoNegociacao"
          onBlur={validateRadioSelection} // Adicione isso aqui
        >
          <FormControlLabel
            control={<Radio />}
            value="venda"
            label="Venda"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Radio />}
            value="aluguel"
            label="Aluguel"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Radio />}
            value="duasopcoes"
            label="Venda e Aluguel"
            labelPlacement="end"
          />
        </RadioGroup>

        {errorText && (
          <FormHelperText error style={{ color: "red" }}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>

      {selectedOption === "venda" && <Venda />}

      {selectedOption === "aluguel" && <Aluguel />}

      {selectedOption === "duasopcoes" && <VendaAluguel />}
    </CenterDiv>
  );
}

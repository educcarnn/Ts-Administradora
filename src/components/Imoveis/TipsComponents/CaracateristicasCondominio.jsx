import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Grid,
} from "@mui/material";
import styled from "styled-components";
import { useFormularioContext } from "../../../context/CadastroProvider";

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextPage = styled.div`
  color: black;
  font-weight: bold;
  font-size: 1rem;
`;

export default function CaracteristicasCondominio() {
  const { getValues, setValue  } = useFormularioContext();

  const [lazerEsporte, setLazerEsporte] = useState({
    Academia: false,
    Churrasqueira: false,
    Cinema: false,
    EspaçoGourmet: false,
    Jardim: false,
    Piscina: false,
    Playground: false,
    QuadraSquash: false,
    QuadraTenis: false,
    QuadraPoliesportiva: false,
    SalaoFestas: false,
    SalaoJogos: false,
  });

  const [comodidadesServicos, setComodidadesServicos] = useState({
    AcessoDeficientes: false,
    Bicicletário: false,
    Coworking: false,
    Elevador: false,
    Lavanderia: false,
    Sauna: false,
    SPA: false,
  });

  const [seguranca, setSeguranca] = useState({
    CondomínioFechado: false,
    PortãoEletrônico: false,
    Portaria24h: false,
  });
  const updateFormData = () => {
    const formData = new FormData();

    const addEntriesToFormData = (entries, prefix) => {
      entries.forEach(([key, value]) => {
        if (value) {
          formData.append(`caracteristicas_condominio.${prefix}.${key}`, 'true');
        }
      });
    }

    addEntriesToFormData(Object.entries(lazerEsporte), 'lazerEsporte');
    addEntriesToFormData(Object.entries(comodidadesServicos), 'comodidadesServicos');
    addEntriesToFormData(Object.entries(seguranca), 'seguranca');

    setValue('caracteristicas_condominio', formData);
  };

  const handleCheckboxChange = (name, category) => {
    let currentCaracteristicasCondominio = getValues("caracteristicas_condominio") || [];

    if (category === "lazerEsporte") {
      setLazerEsporte((prevState) => {
        const newState = { ...prevState, [name]: !prevState[name] };
        if (newState[name]) {
          currentCaracteristicasCondominio.push(name);
        } else {
          currentCaracteristicasCondominio = currentCaracteristicasCondominio.filter(caracteristica => caracteristica !== name);
        }
        return newState;
      });
    } else if (category === "comodidadesServicos") {
      setComodidadesServicos((prevState) => {
        const newState = { ...prevState, [name]: !prevState[name] };
        if (newState[name]) {
          currentCaracteristicasCondominio.push(name);
        } else {
          currentCaracteristicasCondominio = currentCaracteristicasCondominio.filter(caracteristica => caracteristica !== name);
        }
        return newState;
      });
    } else if (category === "seguranca") {
      setSeguranca((prevState) => {
        const newState = { ...prevState, [name]: !prevState[name] };
        if (newState[name]) {
          currentCaracteristicasCondominio.push(name);
        } else {
          currentCaracteristicasCondominio = currentCaracteristicasCondominio.filter(caracteristica => caracteristica !== name);
        }
        return newState;
      });
    }

    setValue('caracteristicas_condominio', currentCaracteristicasCondominio);
  };

  return (
    <CenteredDiv>
      <TextPage>Características do Condomínio</TextPage>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">LAZER E ESPORTE</Typography>
              {Object.entries(lazerEsporte).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      onChange={() => handleCheckboxChange(key, "lazerEsporte")}
                      checked={value}
                    />
                  }
                  label={key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">COMODIDADES E SERVIÇOS</Typography>
              {Object.entries(comodidadesServicos).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      onChange={() => handleCheckboxChange(key, "comodidadesServicos")}
                      checked={value}
                    />
                  }
                  label={key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">SEGURANÇA</Typography>
              {Object.entries(seguranca).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      name={key}
                      onChange={() => handleCheckboxChange(key, "seguranca")}
                      checked={value}
                    />
                  }
                  label={key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </CenteredDiv>
  );
}
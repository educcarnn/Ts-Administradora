import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Grid,
} from '@mui/material';
import styled from 'styled-components';
import { useFormularioContext } from '../../../context/CadastroProvider';

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
  const { setDadosFormulario, dadosFormulario } = useFormularioContext();

  const [lazerEsporte, setLazerEsporte] = useState({
    academia: false,
    churrasqueira: false,
    cinema: false,
    espacoGourmet: false,
    jardim: false,
    piscina: false,
    playground: false,
    quadraSquash: false,
    quadraTenis: false,
    quadraPoliesportiva: false,
    salaoFestas: false,
    salaoJogos: false,
  });

  const [comodidadesServicos, setComodidadesServicos] = useState({
    acessoDeficientes: false,
    bicicletario: false,
    coworking: false,
    elevador: false,
    lavanderia: false,
    sauna: false,
    spa: false,
  });

  const [seguranca, setSeguranca] = useState({
    condominioFechado: false,
    portaoEletronico: false,
    portaria24h: false,
  });

  const handleLazerEsporteChange = event => {
    const { name, checked } = event.target;

    setLazerEsporte(prevCaracteristicas => ({
      ...prevCaracteristicas,
      [name]: checked,
    }));

    setDadosFormulario(prevData => ({
      ...prevData,
      caracteristicas_condominio: checked
        ? [...prevData.caracteristicas_condominio, name]
        : prevData.caracteristicas_condominio.filter(item => item !== name),
    }));
  };

  const handleComodidadesServicosChange = event => {
    const { name, checked } = event.target;

    setComodidadesServicos(prevCaracteristicas => ({
      ...prevCaracteristicas,
      [name]: checked,
    }));

    setDadosFormulario(prevData => ({
      ...prevData,
      caracteristicas_condominio: checked
        ? [...prevData.caracteristicas_condominio, name]
        : prevData.caracteristicas_condominio.filter(item => item !== name),
    }));
  };

  const handleSegurancaChange = event => {
    const { name, checked } = event.target;

    setSeguranca(prevCaracteristicas => ({
      ...prevCaracteristicas,
      [name]: checked,
    }));

    setDadosFormulario(prevData => ({
      ...prevData,
      caracteristicas_condominio: checked
        ? [...prevData.caracteristicas_condominio, name]
        : prevData.caracteristicas_condominio.filter(item => item !== name),
    }));
  };

  return (
    <CenteredDiv>
      <TextPage>Características do Condomínio</TextPage>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">LAZER E ESPORTE</Typography>
              {Object.entries(lazerEsporte).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox checked={value} onChange={handleLazerEsporteChange} name={key} />
                  }
                  label={key
                    .split(/(?=[A-Z])/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">COMODIDADES E SERVIÇOS</Typography>
              {Object.entries(comodidadesServicos).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={value}
                      onChange={handleComodidadesServicosChange}
                      name={key}
                    />
                  }
                  label={key
                    .split(/(?=[A-Z])/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl component="fieldset">
            <FormGroup>
              <Typography variant="subtitle1">SEGURANÇA</Typography>
              {Object.entries(seguranca).map(([key, value]) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={value} onChange={handleSegurancaChange} name={key} />}
                  label={key
                    .split(/(?=[A-Z])/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </CenteredDiv>
  );
}

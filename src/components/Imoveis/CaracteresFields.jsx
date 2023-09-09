import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Grid,
  Paper,
  Typography,
  Container,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormularioContext } from "../../context/CadastroProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '800px',  // você pode ajustar esse valor conforme sua necessidade
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  input: {
    color: "black",
  },
  outlinedInput: {
    borderColor: "black",
  },
}));

export default function CaracteresFields() {
  const classes = useStyles();
  const { dadosFormulario, setDadosFormulario } = useFormularioContext(); // Use o hook do contexto

  const [buildingType, setBuildingType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [suites, setSuites] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [areaUtil, setAreaUtil] = useState("");
  const [areaTotal, setAreaTotal] = useState("");

  const handleBuildingTypeChange = (event) => {
    const newBuildingType = event.target.value;
    setBuildingType(newBuildingType);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        tipoConstrucao: event.target.value,
      },
    });
  };

  const handleBedroomsChange = (event) => {
    const newBedrooms = event.target.value;
    setBedrooms(newBedrooms);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        numeroQuartos: event.target.value,
      },
    });
  };

  const handleSuitesChange = (event) => {
    const newSuites = event.target.value;
    setSuites(newSuites);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        numeroSuites: event.target.value,
      },
    });
  };

  const handleBathroomsChange = (event) => {
    const newBathrooms = event.target.value;
    setBathrooms(newBathrooms);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        numeroBanheiros: event.target.value,
      },
    });
  };

  const handleParkingSpacesChange = (event) => {
    const newParkingSpaces = event.target.value;
    setParkingSpaces(newParkingSpaces);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        numeroVagas: event.target.value,
      },
    });
  };

  const handleAreaUtilChange = (event) => {
    const newAreaUtil = event.target.value;
    setAreaUtil(newAreaUtil);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        areaUtil: event.target.value,
      },
    });
  };

  const handleAreaTotalChange = (event) => {
    const newAreaTotal = event.target.value;
    setAreaTotal(newAreaTotal);

    setDadosFormulario({
      ...dadosFormulario,
      caracteristicas: {
        ...dadosFormulario.caracteristicas,
        areaTotal: event.target.value,
      },
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h6">Características da Construção</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Tipo de Construção</FormLabel>
              <Select value={buildingType} onChange={handleBuildingTypeChange}>
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="padrao">Padrão</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="triplex">Triplex</MenuItem>
              </Select>
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Quartos</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={bedrooms}
                onChange={handleBedroomsChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Sendo Suítes</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={suites}
                onChange={handleSuitesChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Banheiros</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={bathrooms}
                onChange={handleBathroomsChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Número de Vagas</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={parkingSpaces}
                onChange={handleParkingSpacesChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Área Útil (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={areaUtil}
                onChange={handleAreaUtilChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel>Área Total (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={areaTotal}
                onChange={handleAreaTotalChange}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  
}

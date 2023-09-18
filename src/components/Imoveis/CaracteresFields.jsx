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
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: "800px", // você pode ajustar esse valor conforme sua necessidade
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
  const { dadosFormulario, setDadosFormulario, submitted } =
    useFormularioContext(); // Use o hook do contexto

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
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!buildingType && submitted}
            >
              <FormLabel>Tipo de Construção</FormLabel>
              <Select
                value={buildingType}
                onChange={handleBuildingTypeChange}
                required
              >
                <MenuItem value="">Selecione</MenuItem>
                <MenuItem value="Padrão">Padrão</MenuItem>
                <MenuItem value="Duplex">Duplex</MenuItem>
                <MenuItem value="Triplex">Triplex</MenuItem>
              </Select>
              {!buildingType && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!bedrooms && submitted}
            >
              <FormLabel>Número de Quartos</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={bedrooms}
                onChange={handleBedroomsChange}
                variant="outlined"
                required
              />
              {!bedrooms && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!suites && submitted}
            >
              <FormLabel>Sendo Suítes</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={suites}
                onChange={handleSuitesChange}
                variant="outlined"
                required
              />
              {!suites && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!bathrooms && submitted}
            >
              <FormLabel>Número de Banheiros</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={bathrooms}
                onChange={handleBathroomsChange}
                variant="outlined"
                required
              />
              {!bathrooms && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!parkingSpaces && submitted}
            >
              <FormLabel>Número de Vagas</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={parkingSpaces}
                onChange={handleParkingSpacesChange}
                variant="outlined"
                required
              />
              {!parkingSpaces && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!areaUtil && submitted}
            >
              <FormLabel>Área Útil (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={areaUtil}
                onChange={handleAreaUtilChange}
                variant="outlined"
                required
              />
              {!areaUtil && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              required
              error={!areaTotal && submitted}
            >
              <FormLabel>Área Total (m²)</FormLabel>
              <Input
                className={classes.input}
                classes={{ outlined: classes.outlinedInput }}
                type="text"
                value={areaTotal}
                onChange={handleAreaTotalChange}
                variant="outlined"
                required
              />
              {!areaTotal && submitted && (
                <FormHelperText>Este campo é obrigatório.</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

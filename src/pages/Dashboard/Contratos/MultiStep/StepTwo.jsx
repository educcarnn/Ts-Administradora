import React from "react";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  container: {
    width: "50%",
    height: "50%"
  }
}));

const StepTwo = () => {
  const classes = useStyles();
  const { activeStep } = useMultiStepContext();

  return (
    <Container className={classes.container}>
      <TextField label="Locatários" fullWidth />
    </Container>
  );
};

export default StepTwo;

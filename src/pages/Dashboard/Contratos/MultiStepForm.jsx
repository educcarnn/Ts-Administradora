import React from "react";
import { Stepper, Step, StepLabel, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StepOne from "./MultiStep/StepOne";
import { useMultiStepContext } from "../../../context/MultiStepProvider";
import StepTwo from "./MultiStep/StepTwo";
import StepThree from "./MultiStep/StepThree";
import StepFour from "./MultiStep/StepFour";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "50%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const MultiStepForm = () => {
  const classes = useStyles();
  const { activeStep, steps, handleNext, handleBack, enviarFormulario } = useMultiStepContext();
  const stepComponents = [<StepOne />, <StepTwo />, <StepThree />, <StepFour/>];

  const handleNextButtonClick = () => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      // Se o usuário estiver na última etapa, envie o formulário
      enviarFormulario();
    }
  };

  const handleBackButtonClick = () => {
    if (activeStep > 0) {
      handleBack();
    }
  };

  return (
    <Container className={classes.container}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {stepComponents[activeStep]}
        <div className={classes.buttonContainer}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBackButtonClick}
            className={classes.button}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleNextButtonClick}
          >
            {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
          </Button>
        </div>
      </div>
      <ToastContainer/>
    </Container>
  );
};

export default MultiStepForm;

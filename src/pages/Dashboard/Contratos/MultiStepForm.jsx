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
    maxWidth: "800px !important",
    backgroundColor: "white",
    zIndex: "2",
    [theme.breakpoints.down("sm")]: {

      maxWidth: "95%", // Ocupa quase toda a largura da tela para melhor visibilidade
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    width: "100%", // Adicionado para garantir que os botões ocupem todo o espaço disponível
    [theme.breakpoints.down("xs")]: {
      // Para dispositivos muito pequenos como celulares
      flexDirection: "column", // Os botões ficam um abaixo do outro
    },
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      // Para dispositivos muito pequenos
      width: "100%", // O botão ocupa a largura total
      margin: theme.spacing(1, 0), // Margem apenas vertical
    },
  },
  stepper: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

}));

const MultiStepForm = () => {
  const classes = useStyles();
  const { activeStep, steps, handleNext, handleBack, enviarFormulario } =
    useMultiStepContext();
  const stepComponents = [
    <StepOne />,
    <StepTwo />,
    <StepThree />,
    <StepFour />,
  ];

  const handleNextButtonClick = () => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
   
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
      <Stepper
        activeStep={activeStep}
        orientation={window.innerWidth <= 600 ? "vertical" : "horizontal"}
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
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
      </>
      <ToastContainer />
    </Container>
  );
};

export default MultiStepForm;

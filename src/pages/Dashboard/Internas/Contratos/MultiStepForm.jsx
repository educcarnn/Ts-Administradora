import React from "react";
import { Stepper, Step, StepLabel, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StepOne from "./MultiStep/StepOne";

import { useMultiStepContext } from "../../../../context/MultiStepProvider";
import StepTwo from "./MultiStep/StepTwo";
import StepTree from "./MultiStep/StepTree";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const MultiStepForm = () => {
  const classes = useStyles();
  const { activeStep, steps, handleNext, handleBack } = useMultiStepContext();
  const stepComponents = [<StepOne />, <StepTwo />, <StepTree/>];

  const handleNextButtonClick = () => {
    if (activeStep < steps.length - 1) {
      handleNext();
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
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBackButtonClick}
            className={classes.button}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleNextButtonClick}
          >
            {activeStep === steps.length - 1 ? "Finalizar" : "Próxima"}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default MultiStepForm;

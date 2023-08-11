import React, { createContext, useState, useContext } from "react";

// Crie o contexto MultiStepContext
const MultiStepContext = createContext();

// Crie um componente de provedor para o contexto
export const MultiStepProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Dados do Contrato", "Locatários e Tributação"];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <MultiStepContext.Provider
      value={{
        activeStep,
        steps,
        handleNext,
        handleBack,
      }}
    >
      {children}
    </MultiStepContext.Provider>
  );
};


export const useMultiStepContext = () => {
  return useContext(MultiStepContext);
};

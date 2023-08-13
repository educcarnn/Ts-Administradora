import React, { createContext, useContext, useState } from "react";

const NegociacaoContext = createContext();

export function useNegociacao() {
  return useContext(NegociacaoContext);
}

export function NegociacaoProvider({ children }) {
  const [saleType, setSaleType] = useState([]);
  const [isCondoExempt, setIsCondoExempt] = useState(false);
  const [condoValue, setCondoValue] = useState("");
  const [isIptuExempt, setIsIptuExempt] = useState(false);
  const [iptuValue, setIptuValue] = useState({
    matricula: "",
    mensal: "",
  });
  const [rentalModalities, setRentalModalities] = useState({
    seguroFianca: true,
  });

  const handleSaleTypeChange = (value) => {
    setSaleType(value);
  };

  const handleCondoExemptChange = (event) => {
    setIsCondoExempt(event.target.checked);
    if (isIptuExempt) {
      setIsIptuExempt(false);
    }
  };

  const handleIptuExemptChange = (event) => {
    setIsIptuExempt(event.target.checked);
    if (isCondoExempt) {
      setIsCondoExempt(false);
    }
  };

  const handleCondoValueChange = (event) => {
    setCondoValue(event.target.value);
  };

  const handleIptuValueChange = (event) => {
    const { name, value } = event.target;
    setIptuValue((prevIptuValue) => ({
      ...prevIptuValue,
      [name]: value,
    }));
  };

  const handleRentalModalityChange = (event) => {
    const { name, checked } = event.target;
    setRentalModalities((prevModalities) => ({
      ...prevModalities,
      [name]: checked,
    }));
  };

  const values = {
    saleType,
    handleSaleTypeChange,
    isCondoExempt,
    handleCondoExemptChange,
    condoValue,
    handleCondoValueChange,
    isIptuExempt,
    handleIptuExemptChange,
    iptuValue,
    handleIptuValueChange,
    rentalModalities,
    handleRentalModalityChange,
  };

  return (
    <NegociacaoContext.Provider value={values}>
      {children}
    </NegociacaoContext.Provider>
  );
}

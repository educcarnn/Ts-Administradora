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
  const [iptuValue, setIptuValue] = useState("");
  const [rentalModalities, setRentalModalities] = useState({
    seguroFianca: true,
  });

  const handleSaleTypeChange = (value) => {
    setSaleType(value);
  };

  const handleCondoExemptChange = (event) => {
    setIsCondoExempt(event.target.checked);
  };

  const handleIptuExemptChange = (event) => {
    setIsIptuExempt(event.target.checked);
  };

  const handleCondoValueChange = (event) => {
    setCondoValue(event.target.value);
  };

  const handleIptuValueChange = (event) => {
    setIptuValue(event.target.value);
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

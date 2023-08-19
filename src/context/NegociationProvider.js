import React, { createContext, useContext, useState } from 'react';
import { useFormularioContext } from '../context/CadastroProvider'; // Importe o contexto de CadastroProvider
const NegociacaoContext = createContext();

export function useNegociacao() {
  return useContext(NegociacaoContext);
}

export function NegociacaoProvider({ children }) {
  const { dadosFormulario, setDadosFormulario } = useFormularioContext(); // Use o contexto adequado
  const [isCondoExempt, setIsCondoExempt] = useState(false);
  const [condoValue, setCondoValue] = useState('');
  const [isIptuExempt, setIsIptuExempt] = useState(false);
  const [iptuValue, setIptuValue] = useState('');
  const [matriculIptu, setMatriculIptu] = useState('');
  const [saleType, setSaleType] = useState([]); // Adicione o estado para os tipos de negociação

  const handleCondoExemptChange = event => {
    setIsCondoExempt(event.target.checked);
    setDadosFormulario(prevData => ({
      ...prevData,
      tipoCondominio: event.target.checked ? 'isento' : 'naoIsento',
    }));
  };

  const handleIptuExemptChange = event => {
    setIsIptuExempt(event.target.checked);
    setDadosFormulario(prevData => ({
      ...prevData,
      tipoIptu: event.target.checked ? 'isento' : 'naoIsento',
    }));
  };

  const handleCondoValueChange = event => {
    const newValue = event.target.value;
    setCondoValue(newValue);
    setDadosFormulario(prevData => ({
      ...prevData,
      condominio: {
        ...prevData.condominio,
        valor_mensal_condominio: newValue,
      },
    }));
  };

  const handleIptuValueChange = event => {
    const newValue = event.target.value;
    setIptuValue(newValue);
    setDadosFormulario(prevData => ({
      ...prevData,
      iptu: {
        ...prevData.iptu,
        valorMensal: newValue,
      },
    }));
  };

  const handleCondominioChange = event => {
    const { name, value } = event.target;
    setDadosFormulario(prevData => ({
      ...prevData,
      condominio: {
        ...prevData.condominio,
        [name]: value,
      },
    }));
  };

  const handleIptuChange = event => {
    const { name, value } = event.target;
    setDadosFormulario(prevData => ({
      ...prevData,
      iptu: {
        ...prevData.iptu,
        [name]: value,
      },
    }));
  };

  const handleSaleTypeChange = type => {
    if (saleType.includes(type)) {
      setSaleType([]);
    } else {
      setSaleType([type]);
    }
  };

  const values = {
    isCondoExempt,
    setIsCondoExempt,
    handleCondoExemptChange,
    condoValue,
    setIsIptuExempt,
    matriculIptu,
    handleIptuChange,
    handleCondoValueChange,
    isIptuExempt,
    handleIptuExemptChange,
    iptuValue,
    handleIptuValueChange,
    saleType, // Adicione o estado dos tipos de negociação
    handleSaleTypeChange,
  };

  return <NegociacaoContext.Provider value={values}>{children}</NegociacaoContext.Provider>;
}

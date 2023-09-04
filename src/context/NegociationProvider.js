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
  const [matriculIptu] = useState('');
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

  const handleSaleTypeChange = (type) => {
    let resetValues = {
      valorAluguel: '',
      taxaAdministracao: '',
      taxaLocacao: '',
      valorVenda: '',
      taxaIntermediacao: '',
      vendaealuguelVenda: '',
      vendaealuguelAluguel: '',
      vendaealuguelTaxa: ''
    };
  
    if (type === "aluguel") {
      resetValues = {
        valorAluguel: dadosFormulario.negociacao.valores.valorAluguel,
        taxaAdministracao: dadosFormulario.negociacao.valores.taxaAdministracao,
        taxaLocacao: dadosFormulario.negociacao.valores.taxaLocacao
      };
    } else if (type === "venda") {
      resetValues = {
        valorVenda: dadosFormulario.negociacao.valores.valorVenda,
        taxaIntermediacao: dadosFormulario.negociacao.valores.taxaIntermediacao
      };
    } else if (type === "duasopcoes") {
      resetValues = {
        vendaealuguelVenda: dadosFormulario.negociacao.valores.vendaealuguelVenda,
        vendaealuguelAluguel: dadosFormulario.negociacao.valores.vendaealuguelAluguel,
        vendaealuguelTaxa: dadosFormulario.negociacao.valores.vendaealuguelTaxa
      };
    }
  
    setDadosFormulario(prevState => ({
      ...prevState,
      negociacao: {
        ...prevState.negociacao,
        valores: resetValues
      }
    }));
  
    // Atualiza o saleType
    setSaleType([type]);  // Aqui garantimos que apenas um tipo esteja no array
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

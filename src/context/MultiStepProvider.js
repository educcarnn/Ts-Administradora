import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { API_Contrato } from '../db/Api';
import { useHistory } from 'react-router-dom';

const MultiStepContext = createContext();
const initialData = {
  pessoa: null,
  proprietariosPessoaJuridica: [],
  imovel: null,
  proprietario: null,
  tipoContrato: '',
  locatarios: [],
  garantia: {
    tipo: '',
    fiador: '',
    dataInicio: '',
    dataTermino: '',
    valor: 0,
    seguradora: '',
    apolice: '',
    numeroParcelas: 0,
    observacao: '',
  },
  detalhesContrato: {
    reajuste: '',
    dataInicio: '',
    dataTermino: '',
    duracao: '',
    valor: 0,
    vencimento: '',
    ocupacao: '',
    cobranca: [],
    taxaAdministração: 0,
  },
};

export const MultiStepProvider = ({ children }) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [dadosFormulario, setDadosFormulario] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const steps = [
    'Dados do Contrato',
    'Locatários e Tributação',
    'Garantia',
    'Detalhes do contrato',
  ];

  const enviarFormulario = async () => {
    try {
      setLoading(true);
      await API_Contrato(dadosFormulario);
      setLoading(false);

      // Cadastro bem-sucedido, exibir toast e redirecionar após 2 segundos
      toast.success('Contrato cadastrado com sucesso');
      setTimeout(() => {
        history.push('/obter-contratos-novo'); // Substitua pela rota desejada
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao cadastrar imóvel.');
    }
  };

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <MultiStepContext.Provider
      value={{
        activeStep,
        steps,
        handleNext,
        enviarFormulario,
        handleBack,
        setDadosFormulario,
        dadosFormulario,
      }}>
      {children}
    </MultiStepContext.Provider>
  );
};

export const useMultiStepContext = () => {
  return useContext(MultiStepContext);
};

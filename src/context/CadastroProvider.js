import React, { createContext, useContext, useState } from 'react';
import { dadosParaAPI_Cadastro } from '../db/Api';

import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const initialFormData = {
  tipoImovel: '',
  generoImovel: '',
  caracteristicas: {
    tipoConstrucao: '',
    numeroQuartos: 0,
    numeroSuites: 0,
    numeroBanheiros: 0,
    numeroVagas: 0,
    areaUtil: 0,
    areaTotal: 0
  },
  tipoNegociacao: '',
  venda: {
    valorVenda: 0,
    taxaIntermediacao: 0
  },
  tipoIptu: '',
  iptu: {
    numero_matricula_iptu: 0,
    valorMensal: 0
  },
  tipoCondominio: '',
  condominio: {
    nome_condominio: '',
    nome_administradora: '',
    razao_social_condominio: '',
    cnpj_condominio: '',
    site_condominio: '',
    login_condominio: '',
    senha_condominio: '',
    telefone_fixo_condominio: '',
    telefone_celular_condominio: '',
    valor_mensal_condominio: 0
  },
  proprietários: {
    proprietário: '',
    percentual: 0,
    novos_proprietarios: []
  },
  localizacao: {
    cep: 0,
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    andar: 0,
    numero: 0
  },
  caracteristicas_imovel: [],
  caracteristicas_condominio: []
};

const FormularioContext = createContext();

export const FormularioProvider = ({ children }) => {
  // Estado para os dados do formulário
    const history = useHistory();

  const [dadosFormulario, setDadosFormulario] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  // Função para enviar o formulário
  const enviarFormulario = async () => {
    try {
      setLoading(true);
      await dadosParaAPI_Cadastro(dadosFormulario);
      setLoading(false);

      // Cadastro bem-sucedido, exibir toast e redirecionar após 2 segundos
      toast.success('Imóvel cadastrado com sucesso!');
      setTimeout(() => {
        history.push('/imoveis-cadastrados'); // Substitua pela rota desejada
      }, 2000); // Atraso de 2 segundos
    } catch (error) {
      setLoading(false);
      console.error('Erro ao enviar formulário:', error);
      toast.error('Erro ao cadastrar imóvel.');
    }
  };
  return (
    <FormularioContext.Provider
      value={{
        dadosFormulario,
        setDadosFormulario,
        loading,
        enviarFormulario,
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
};

export const useFormularioContext = () => {
  return useContext(FormularioContext);
};

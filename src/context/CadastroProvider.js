import React, { createContext, useContext, useState } from "react";
import { dadosParaAPI_Cadastro } from "../db/Api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useJwt } from "react-jwt";

const initialFormData = {
  tipoImovel: "Comercial",
  generoImovel: "",
  caracteristicas: {
    tipoConstrucao: "",
    numeroQuartos: 0,
    numeroSuites: 0,
    numeroBanheiros: 0,
    numeroVagas: 0,
    areaUtil: 0,
    areaTotal: 0,
  },
  negociacao: {
    tipo: "",
    valores: {
      valorVenda: 0,
      taxaIntermediacao: 0,
      valorAluguel: 0,
      taxaAdministracao: 0,
      taxaLocacao: 0,
      vendaealuguelVenda: 0,
      vendaealuguelAluguel: 0,
      vendaealuguelTaxa: 0,
    },
  },
  tipoIptu: "",
  iptu: {
    numero_matricula_iptu: 0,
    valorMensal: 0,
  },
  tipoCondominio: "",
  condominio: {
    nome_condominio: "",
    nome_administradora: "",
    razao_social: "",
    cnpj: "",
    site: "",
    login: "",
    senha: "",
    telefone_fixo: "",
    telefone_celular: "",
    valor_mensal: 0,
  },
  percentual: 0,
  localizacao: {
    cep: 0,
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    andar: 0,
    numero: 0,
  },
  caracteristicas_imovel: [],
  caracteristicas_condominio: [],
  proprietarios: [
    {
      id: 0,
      percentual: 0,
    }
  ],
};


const FormularioContext = createContext();

export const FormularioProvider = ({ children }) => {
  const history = useHistory();
  const [person, setPerson] = useState(0);
  const [dadosFormulario, setDadosFormulario] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Novo estado

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);

  const enviarFormulario = async () => {
    setSubmitted(true);
    try {
      setLoading(true);
      setDadosFormulario(initialFormData);
      await dadosParaAPI_Cadastro(dadosFormulario, person);
      setLoading(false);

      toast.success("Imóvel cadastrado com sucesso!");

      setTimeout(() => {
        if (decodedToken && decodedToken.role === "admin") {
          history.push("/admin/imoveis-cadastrados");
        } else if (decodedToken && decodedToken.role === "user") {
          history.push("/user/imoveis-cadastrados");
        } else {
   
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro ao cadastrar imóvel.");
    }
  };

  return (
    <FormularioContext.Provider
      value={{
        dadosFormulario,
        setDadosFormulario,
        loading,
        enviarFormulario,
        setPerson,
        person,
        submitted,          // Adicionado
        setSubmitted,       // Adicionado
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
};

export const useFormularioContext = () => {
  return useContext(FormularioContext);
};
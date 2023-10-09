import React, { createContext, useContext, useState } from "react";
import { dadosParaAPI_Cadastro } from "../db/Api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useJwt } from "react-jwt";
import { API_URL } from "../db/Api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const fields = {
  tipoImovel: "Comercial",
  generoImovel: "",
  caracteristicas: {
    tipoConstrucao: "",
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
  tipoIptu: "Isento",
  iptu: {
    numero_matricula_iptu: 0,
    valorMensal: 0,
  },
  tipoCondominio: "Isento",
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

  caracteristicas_imovel: [],
  caracteristicas_condominio: [],
  fotos: [],
  anuncio: {
    title: "",
    description: "",
    contrato: "",
  },
};

const FormularioContext = createContext();

export const FormularioProvider = ({ children }) => {
  const {
    register,
    handleSubmit,
    Controller,
    setValue,
    getValues,
    control,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: fields,
  });


  const onSubmit = async (data, setResponse) => {
    const formData = new FormData();
    formData.append("tipoImovel", data.tipoImovel || ""); // Valor padrão como string vazia
    formData.append("generoImovel", data.generoImovel || "");
    formData.append("tipoIptu", data.tipoIptu || "Isento");
    formData.append("tipoCondominio", data.tipoCondominio || "Isento");
  
    // Características
    formData.append(
      "caracteristicas[tipoConstrucao]",
      data.caracteristicas.tipoConstrucao
    );
  
    formData.append(
      "caracteristicas[numeroQuartos]",
      data.caracteristicas.numeroQuartos
    );
    formData.append(
      "caracteristicas[numeroSuites]",
      data.caracteristicas.numeroSuites
    );
    formData.append(
      "caracteristicas[numeroBanheiros]",
      data.caracteristicas.numeroBanheiros
    );
    formData.append(
      "caracteristicas[numeroVagas]",
      data.caracteristicas.numeroVagas
    );
    formData.append("caracteristicas[areaUtil]", data.caracteristicas.areaUtil);
    formData.append("caracteristicas[areaTotal]", data.caracteristicas.areaTotal);
  
    // Negociação
  
    formData.append(
      "negociacao[valores][valorVenda]",
      data.negociacao.valores.valorVenda
    );
    formData.append(
      "negociacao[valores][taxaIntermediacao]",
      data.negociacao.valores.taxaIntermediacao
    );
  
    formData.append("negociacao[tipo]", data.negociacao.tipo);
  
    formData.append(
      "negociacao[valores][valorAluguel]",
      data.negociacao.valores.valorAluguel
    );
    formData.append(
      "negociacao[valores][taxaAdministracao]",
      data.negociacao.valores.taxaAdministracao
    );
    formData.append(
      "negociacao[valores][taxaLocacao]",
      data.negociacao.valores.taxaLocacao
    );
    formData.append(
      "negociacao[valores][vendaealuguelVenda]",
      data.negociacao.valores.vendaealuguelVenda
    );
    formData.append(
      "negociacao[valores][vendaealuguelAluguel]",
      data.negociacao.valores.vendaealuguelAluguel
    );
    formData.append(
      "negociacao[valores][vendaealuguelTaxa]",
      data.negociacao.valores.vendaealuguelTaxa
    );
  
    // IPTU
  
    formData.append(
      "iptu[numero_matricula_iptu]",
      data.iptu.numero_matricula_iptu
    );
    formData.append("iptu[valorMensal]", data.iptu.valorMensal);
  
    formData.append(
      "condominio[nome_condominio]",
      data.condominio.nome_condominio
    );
    formData.append(
      "condominio[nome_administradora]",
      data.condominio.nome_administradora
    );
    formData.append("condominio[razao_social]", data.condominio.razao_social);
    formData.append("condominio[cnpj]", data.condominio.cnpj);
    formData.append("condominio[site]", data.condominio.site);
    formData.append("condominio[login]", data.condominio.login);
    formData.append("condominio[senha]", data.condominio.senha);
    formData.append("condominio[telefone_fixo]", data.condominio.telefone_fixo);
    formData.append(
      "condominio[telefone_celular]",
      data.condominio.telefone_celular
    );
    formData.append("condominio[valor_mensal]", data.condominio.valor_mensal);
  
    // Percentual
    formData.append("percentual", data.percentual);
  
    // Localização
    formData.append("localizacao[cep]", data.localizacao.cep);
    formData.append("localizacao[endereco]", data.localizacao.endereco);
    formData.append("localizacao[bairro]", data.localizacao.bairro);
    formData.append("localizacao[cidade]", data.localizacao.cidade);
    formData.append("localizacao[estado]", data.localizacao.estado);
    formData.append("localizacao[andar]", data.localizacao.andar);
    formData.append("localizacao[numero]", data.localizacao.numero);
  
    // Anúncio
    formData.append("anuncio[title]", data.anuncio.title);
    formData.append("anuncio[description]", data.anuncio.description);
    formData.append("anuncio[contrato]", data.anuncio.contrato);
  
    data.caracteristicas_imovel.forEach((item, index) => {
      formData.append(`caracteristicas_imovel[${index}]`, item);
    });
  
    data.caracteristicas_condominio.forEach((item, index) => {
      formData.append(`caracteristicas_condominio[${index}]`, item);
    });
  
    // Proprietários
    data.proprietarios.forEach((proprietario, index) => {
      formData.append(`proprietarios[${index}][id]`, proprietario.id);
      formData.append(
        `proprietarios[${index}][percentual]`,
        proprietario.percentual
      );
      formData.append(`proprietarios[${index}][tipo]`, proprietario.tipo);
    });
  
    if (data.fotos && Array.isArray(data.fotos)) {
      data.fotos.forEach((file) => {
        formData.append("fotos", file);
      });
    }
  
    if (data.anexos && Array.isArray(data.anexos)) {
      data.anexos.forEach((file) => {
        formData.append("anexos", file);
      });
    }
  
    if (data.contratos && Array.isArray(data.contratos)) {
      data.contratos.forEach((file) => {
        formData.append("contratos", file);
      });
    }

    try {
      const response = await API_URL.post(`/cadastro-imovel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(response);
    
    } catch (error) {}
  };

  const history = useHistory();
  const [person, setPerson] = useState(0);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setTimeout(() => {
        history.push("/admin/imoveis-cadastrados");
        toast.success("Cadastro realizado com sucesso!");
      }, 2000);
    }
  }, [isSubmitSuccessful, history]);

  return (
    <FormularioContext.Provider
      value={{
        loading,
        handleSubmit,
        onSubmit,
        control,
        Controller,
        register,
        setPerson,
        isSubmitting,
        person,
        getValues,
        submitted,
        errors,
        setValue,
        watch,
        setSubmitted,
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
};

export const useFormularioContext = () => {
  return useContext(FormularioContext);
};

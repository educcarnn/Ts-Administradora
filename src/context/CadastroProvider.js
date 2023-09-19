import React, { createContext, useContext, useState } from "react";
import { dadosParaAPI_Cadastro } from "../db/Api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useJwt } from "react-jwt";
import { API_URL } from "../db/Api";
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
  anuncio: {
    title: "",
    description: "",
  },
  anexos: [],
  caracteristicas_imovel: [],
  caracteristicas_condominio: [],
  proprietarios: [
    {
      id: 0,
      percentual: 0,
      tipo: "",
    },
  ],
};

const FormularioContext = createContext();

export const FormularioProvider = ({ children }) => {
  const history = useHistory();
  const [person, setPerson] = useState(0);
  const [dadosFormulario, setDadosFormulario] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Novo estado
  const [anexos, setAnexos] = useState([]);

  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);

  const validarCaracteristicas = () => {
    const campos = dadosFormulario.caracteristicas;
    if (!campos.tipoConstrucao) return "Tipo de Construção é obrigatório!";
    if (!campos.numeroQuartos) return "Número de Quartos é obrigatório!";
    if (!campos.numeroSuites) return "Número de Suítes é obrigatório!";
    if (!campos.numeroBanheiros) return "Número de Banheiros é obrigatório!";
    if (!campos.numeroVagas) return "Número de Vagas é obrigatório!";
    if (!campos.areaUtil) return "Área Útil é obrigatório!";
    if (!campos.areaTotal) return "Área Total é obrigatório!";
    return null;
  };

  const validarCEP = () => {
    const cep = dadosFormulario.localizacao.cep;
    if (!cep || cep.toString().length === 0) {
      return "CEP é obrigatório";
    }
    return null;
  };
  const validarAnuncio = () => {
    const anuncio = dadosFormulario.anuncio;
    if (!anuncio.title.trim()) return "Título do anúncio é obrigatório!";
    if (!anuncio.description.trim())
      return "Descrição do anúncio é obrigatória!";
    return null;
  };

  const enviarAnexosAPI = async (imovelId, formData) => {
    const url = `/imoveis/anexos`;  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await API_URL.post(url, formData, config);
      return response.data; // Pode retornar a resposta se quiser usar mais tarde
    } catch (error) {
      console.error("Erro ao enviar anexos para a API:", error);
      throw error; // Relançando o erro para ser tratado pela função "enviarAnexos"
    }
  };

  const enviarAnexos = async (imovelId) => {
    const formData = new FormData();
    for (let i = 0; i < anexos.length; i++) {
      formData.append("anexos", anexos[i]);
    }


    for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      await enviarAnexosAPI(imovelId, formData);
      toast.success("Anexos enviados com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar anexos.");
    }
};

  const enviarFormulario = async () => {
    setSubmitted(true);
    const erroValidacaoCaracteristicas = validarCaracteristicas();
    const erroValidacaoCEP = validarCEP();
    const erroValidacaoAnuncio = validarAnuncio();

    if (erroValidacaoCaracteristicas) {
      toast.error(erroValidacaoCaracteristicas);
      return;
    }

    if (erroValidacaoCEP) {
      toast.error(erroValidacaoCEP);
      return;
    }

    if (erroValidacaoAnuncio) {
      toast.error(erroValidacaoAnuncio);
      return;
    }

    try {
      setLoading(true);
      const imovelCriado = await dadosParaAPI_Cadastro(dadosFormulario, person);

      if (imovelCriado && imovelCriado.id) {
        await enviarAnexos(imovelCriado.id);
      }

      setDadosFormulario(initialFormData);
      setLoading(false);
      toast.success("Imóvel e anexos cadastrados com sucesso!");

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

  const adicionarAnexos = (novosAnexos) => {
    setDadosFormulario((prevState) => ({
      ...prevState,
      anexos: novosAnexos,
    }));
  };

  return (
    <FormularioContext.Provider
      value={{
        dadosFormulario,
        adicionarAnexos,
        setDadosFormulario,
        loading,
        enviarFormulario,
        setPerson,
        person,
        submitted,
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

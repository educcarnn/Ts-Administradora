import axios from "axios";

export const API_URL = axios.create({
  baseURL: "https://tsadministradora.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionando um interceptor de requisição ao Axios para inserir o token no cabeçalho Authorization
API_URL.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});


export const dadosParaAPI_Cadastro = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/cadastro-imovel`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const API_Contrato = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/cadastro-contrato`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

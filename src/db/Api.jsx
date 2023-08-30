import axios from "axios";

export const API_URL = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

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

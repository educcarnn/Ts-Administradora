import axios from 'axios';

export const API_URL = axios.create({
  baseURL: 'https://tsadministradora.onrender.com',
  withCredentials: 'true',
  headers:{
    "Content-Type": " application/json"
  }
});

export const dadosParaAPI_Cadastro = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/cadastro-imovel`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const API_Contrato = async (data) =>{
  try {
    const response = await axios.post(`${API_URL}/cadastro-contrato`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}



import axios from 'axios';

export const API_URL = 'https://tsadministradora.onrender.com';


export const dadosParaAPI_Cadastro = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/cadastrar-imovel`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
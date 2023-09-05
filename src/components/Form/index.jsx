import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Importe o useHistory
import {
  Form,
  Input,
  ErrorMessage,
  SubmitButton,
  DivForm
} from "./style";
import { API_URL } from "../../db/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components"

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export default function CustomForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const history = useHistory(); // Obtenha o objeto history


  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Locatário/Inquilino é obrigatório";
    if (!email) newErrors.email = "E-mail é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(`${API_URL}/aluguel`, {
          inquilino: name,
          proprietario: email,
          numeroImovel: password,
        });

        toast.success("Cadastro realizado com sucesso!");
        setTimeout(() => {
          history.push("/cadastro-lista"); // Redireciona para a rota de cadastro-lista
        }, 2000); // Tempo em milissegundos (2 segundos)
      } catch (error) {
        console.error("Erro ao enviar dados para a API:", error);
        toast.error("Erro ao cadastrar. Por favor, tente novamente.");
      }
    }

    setErrors(newErrors);
  };

  return (
    <DivForm>
      <h1 className="titleForm">Aluguel</h1>
      <FormStyle onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Locatário / Inquilino"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Proprietário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Imóvel"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </FormStyle>
      <ToastContainer />
    </DivForm>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../../Dashboard/style";
import videoBackground from "../../../assets/Videos/telaLogin.mp4"
import { toast } from 'react-toastify';
import { isExpired } from 'react-jwt';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const VideoBG = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100vh;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
`;

const Text = styled.p`
  
  color: white;
  font-weight: bold;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function InviteAdmin() {

  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {
      if(isExpired(token)) {
        toast.error("O token expirou.");
        history.push("/");
      }
    } else {
      toast.error("Token não fornecido.");
      history.push("/");
    }
  }, [history, location.search]);


  const handleRegister = async () => {
    try {
      const response = await API_URL.post("/admin/register", {
        email,
        password,
        role: "admin",
      });
  
      if (response.status === 201) {
        toast.success("Registro realizado com sucesso!"); // Notificação de sucesso
        setTimeout(() => {
          history.push("/"); // Substitua pela sua rota
        }, 2500); // Redireciona após 2,5 segundos
      } else {
        console.error("Erro no registro. Resposta:", response);
        toast.error("Erro ao realizar o registro."); // Notificação genérica de erro
      }
    } catch (error) {
      console.error("Erro no registro:", error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || "Erro desconhecido.";
      toast.error("Erro ao realizar o registro: " + errorMessage); // Notificação de erro com a mensagem específica
    }
  };

  return (
    <div>
      <DashboarDiv>Ts Administradora - Cadastro de Admins</DashboarDiv>
      <VideoBG autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </VideoBG>
      <Container>
        <Text>Complete o registro</Text>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Registrar</Button>
      </Container>
    </div>
  );
}
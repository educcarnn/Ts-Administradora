import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../../Dashboard/style";
import videoBackground from "../../../assets/Videos/telaLogin.mp4";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { isExpired } from "react-jwt";
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
`;

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

export default function CreateBusiness() {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Novo estado para a senha de confirmação
  const [empresaId, setEmpresaId] = useState("");
  const [empresaData, setEmpresaData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
  });
  useEffect(() => {
    setEmpresaId(new URLSearchParams(location.search).get("empresaId"));
    setEmail(new URLSearchParams(location.search).get("email"));
    const token = new URLSearchParams(location.search).get("token");
    const nomeEmpresa = new URLSearchParams(location.search).get("empresa");
    const enderecoEmpresa = new URLSearchParams(location.search).get(
      "endereco"
    );
    const telefoneEmpresa = new URLSearchParams(location.search).get(
      "telefone"
    );

    setEmpresaData({
      nome: nomeEmpresa || "",
      endereco: enderecoEmpresa || "",
      telefone: telefoneEmpresa || "", // Defina um valor padrão vazio se não houver parâmetro na URL
    });

    if (token) {
        if(isExpired(token)) {
          toast.error("O token expirou.");
          history.push("/");
        }
      } else {
        toast.error("Token não fornecido.");
        history.push("/");
      }

  }, [location.search]);

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      // Verificação de senha de confirmação
      toast.error("As senhas não coincidem.");
      return;
    }
    const response = await API_URL.post("/cadastrar-nova-empresa", {
      nome: empresaData.nome,
      endereco: empresaData.endereco,
      telefone: empresaData.telefone,
      email,
      senha: password,
    });


    console.log(response);
    if (response.status === 201) {
      toast.success("Registro realizado com sucesso!");
      setTimeout(() => {
        history.push("/");
      }, 2500);
    } else {
      console.error("Erro no registro. Resposta:", response);
      toast.error("Erro ao realizar o registro.");
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
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado da senha de confirmação
        />
        <Input
          placeholder="Nome da Empresa"
          disabled
          value={empresaData.nome}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, nome: e.target.value })
          }
        />
        <Input
          placeholder="Endereço da Empresa"
          disabled
          value={empresaData.endereco}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, endereco: e.target.value })
          }
        />
        <Input
          placeholder="Telefone da Empresa"
          disabled
          value={empresaData.telefone}
          onChange={(e) =>
            setEmpresaData({ ...empresaData, telefone: e.target.value })
          }
        />
        <Button onClick={handleRegister}>Registrar</Button>
      </Container>
    </div>
  );
}

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../db/Api";
import {
  Container,
  Titulo,
  ContainerInput,
  Input,
  Botao,
  VideoBackground,
  ContainerLogin,
} from "./style";
import telaLogin from "../../../src/assets/Videos/telaLogin.mp4";

export default function LoginAndRegister() {
  const history = useHistory();

  const [dadosLogin, setDadosLogin] = useState({
    email: "",
    password: "",
  });

  const atualizarDadosLogin = (e) => {
    const { name, value } = e.target;
    setDadosLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const efetuarLogin = async () => {
    const { email, password } = dadosLogin;

    try {
      const resposta = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (resposta.status === 200) {
        const dados = await resposta.json();
        localStorage.setItem("token", dados.token);

        toast.success("Logado com sucesso");
        setTimeout(() => {
          history.push("/dashboard");
        }, 3000);
      } else {
        const erroDados = await resposta.json();
        toast.error(erroDados.message);
        console.log(email)
        console.log(password)
      }
    } catch (erro) {
      toast.error("Erro ao efetuar o login.");
      console.error("Erro ao efetuar o login:", erro);
    }
    
  };

  return (
    <Container>
      <VideoBackground autoPlay loop muted>
        <source src={telaLogin} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </VideoBackground>
      
      <ContainerLogin>
        <Titulo>Bem-vindo ao futuro</Titulo>

        <ContainerInput>
          <Input
            type="text"
            placeholder="Login"
            name="email"
            value={dadosLogin.email}
            onChange={atualizarDadosLogin}
          />
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            value={dadosLogin.password}
            onChange={atualizarDadosLogin}
          />
          <Botao onClick={efetuarLogin}>Login</Botao>

        </ContainerInput>
      </ContainerLogin>
    </Container>
  );
}

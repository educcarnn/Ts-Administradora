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
    try {
      const resposta = await API_URL.post(`/users/login`, dadosLogin);

      localStorage.setItem('token', resposta.data.token);
  
      toast.success("Logado com sucesso");
      
      setTimeout(() => {
        switch (resposta.data.role) {
          case "user":
            history.push("/dashboard-user");
            break;
          case "admin":
            history.push("/dashboard");
            break;
          default:
            history.push("/"); // rota padrão caso não haja correspondência
        }
      }, 3000);
    } catch (erro) {
      if (erro.response) {
        toast.error(erro.response.data.message);
      } else if (erro.request) {
        toast.error("Não houve resposta do servidor. Por favor, tente novamente.");
      } else {
        toast.error("Erro ao efetuar o login.");
        console.error("Erro ao efetuar o login:", erro.message);
      }
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

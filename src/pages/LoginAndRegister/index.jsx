import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const DivContainer = styled.div`
  background-color: #06064b;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
`;

const TitleItem = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #e9e9e97a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LabelName = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: #ffffff;
`;

const ColumnTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterButton = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  color: #ff6600;
  cursor: pointer;
`;

export default function LoginAndRegister() {
  const history = useHistory(); // Inicialize o hook useHistory

  const onSubmit = (data) => {
    // Processar seus dados aqui, se necessário
    // Redirecionar para o dashboard
    history.push("/dashboard"); // Substitua pelo caminho real do dashboard
  };

  const redirectToJuridicaPage = () => {
    history.push("/clientes-pessoa-juridica"); // Substitua pelo caminho da sua página de registro
  };

  const redirectToFisicaPage = () => {
    history.push("/clientes-pessoa-fisica");
  };

  return (
    <DivContainer>
      <TitleItem>TS Administradora</TitleItem>
      <InputContainer>
        <Input type="text" placeholder="Login" />
        <Input type="password" placeholder="Senha" />
        <Button>Realizar Login</Button>
        <Button onClick={onSubmit}>Dashboard(Redirect)</Button>
      </InputContainer>
      <ColumnTable>
        <LabelName>Não é cadastrado?</LabelName>
        <LabelName>Faça seu cadastro(Física ou Jurídica)</LabelName>
        <RegisterButton onClick={redirectToFisicaPage}>
          Pessoa Física
        </RegisterButton>
        <RegisterButton onClick={redirectToJuridicaPage}>
          Pessoa Jurídica
        </RegisterButton>
      </ColumnTable>
    </DivContainer>
  );
}

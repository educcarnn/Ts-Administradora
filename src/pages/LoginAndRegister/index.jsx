import styled from "styled-components";

export const DivContainer = styled.div`
background-color: #4b4b4d;
    width: 100%;
    height: 100vh;
    gap: 5%;
    color: white;
    gap: 5rem;
    gpa: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const TittleItem = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  color: #ffffff; /* Cor desejada para o título */
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #c713c71f; /* Cor desejada para o botão */
  color: white;
  border: none;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  color: #ff6600; /* Cor desejada para o botão */
  cursor: pointer;
`;

export default function LoginAndRegister() {
  return (
    <DivContainer>
      <div>
        <TittleItem>TS Administradora</TittleItem>
      </div>

      <div>
        <InputContainer>
          <Input type="text" placeholder="Login" />
          <Input type="text" placeholder="Senha" />
          <Button>Realize Login</Button>
        </InputContainer>

        <div>
          <label>Não é cadastrado?</label>
          <RegisterButton>Faça seu cadastro</RegisterButton>
        </div>
      </div>
    </DivContainer>
  );
}

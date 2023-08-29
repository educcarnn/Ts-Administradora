import styled from "styled-components";

// Usando background gradient e sombras para um visual mais moderno.
const Container = styled.div`
  background: linear-gradient(135deg, #06064b, #4747d1);
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.div`
    font-size: 1.8em;
  z-index: 2;
  font-weight: bolder;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContainerInput = styled.div`
 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    z-index: 2;

    padding: 20px;
    border-radius: 15px;
    max-width: 800px;
    width: 80%;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2); /* sombra para dar efeito de levitação */
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg); /* rotação sutil para dar a sensação de 3D */
`;

// Adicionando ícones para os campos de email e senha para melhor apelo visual.
const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px 40px 10px 10px;
  border: 2px solid white;
  border-radius: 15px;
  background-color: #584f4f;
  color: white;
  transition: border 0.3s;

  &:focus {
    border: 2px solid #4747d1;
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &[name="email"] {
    background-image: url("/path/to/email-icon.png");
    background-repeat: no-repeat;
    background-position: 95% center;
  }

  &[name="password"] {
    background-image: url("/path/to/password-icon.png");
    background-repeat: no-repeat;
    background-position: 95% center;
  }
`;

const Botao = styled.button`
  padding: 15px 30px;
  background-color: #4747d1;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #3434b5;
  }
`;

export const ContainerLogin = styled.div`
     z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
    height: 100%;
    gap: 50%;
    justify-content: space-evenly;
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
`;

export { Container, Titulo, ContainerInput, Input, Botao };

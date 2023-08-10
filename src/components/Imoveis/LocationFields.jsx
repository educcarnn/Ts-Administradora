import styled from "styled-components"

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  background-color: blue;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  .text {
    color: white;
  }

  .textLocation{
    color: black;
  }
`;

const FormBox = styled.form`
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LocationBox = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;
export const LocationFields = () => {
    return (
      <LocationBox>
        <div as="h2" size="lg" mb={4} className="textLocation">
          Localização
        </div>
        <FormBox mt={2}>CEP</FormBox>
        <input type="text" placeholder="Digite o CEP" />
        <FormBox>Endereço</FormBox>
        <input type="text" placeholder="Digite o endereço" />
        <FormBox mt={2}>Cidade</FormBox>
        <input type="text" placeholder="Digite a cidade" />
        <FormBox mt={2}>Estado</FormBox>
        <input type="text" placeholder="Digite o estado" />
      </LocationBox>
    );
  };

import styled from "styled-components"

export const DivCadastro = styled.div`
    background-color: white;
    color: black;
    height: 100;
`
export const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const CheckboxLabel = styled(Label)`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
`;
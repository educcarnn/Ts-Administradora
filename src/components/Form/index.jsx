import React, { useState } from "react";
import { Form, Input, ErrorMessage, SubmitButton, DivForm} from "./style";

export default function CustomForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Locatório/Inquilino é obrigatório";
    if (!email) newErrors.email = "E-mail é obrigatório";
    if (!password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
  };

  return (
    <form>
      <DivForm>
        <h1 className="titleForm">Cadastro</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Locatário / Inquilino"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <Input
            type="email"
            placeholder="Proprietário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="password"
            placeholder="Imovél"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <SubmitButton type="submit">Cadastrar</SubmitButton>
        </Form>
      </DivForm>
    </form>
  );
}

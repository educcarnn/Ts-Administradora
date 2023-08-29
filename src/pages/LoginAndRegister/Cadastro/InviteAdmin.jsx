import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { API_URL } from "../../../db/Api";
import { DashboarDiv } from "../../Dashboard/style";
import axios from "axios";

export default function InviteAdmin() {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (token) {

      localStorage.setItem("token", token);
      setTokenValid(true);
    } else {

      history.push("/"); 
    }
  }, [history, location.search]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/register`, {
        email,
        password,
        role: 'admin'
      });

      if (response.status === 200) {

        history.push("/"); // Substitua pela sua rota
      } else {
  
        console.error("Erro no registro");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <div>
      <DashboarDiv>
        <div>Ts Administradora - Cadastro de Admins</div>
      </DashboarDiv>
      {tokenValid && (
        <div>
          <p>Complete o registro:</p>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
    
          <button onClick={handleRegister}>Registrar</button>
        </div>
      )}
    </div>
  );
}

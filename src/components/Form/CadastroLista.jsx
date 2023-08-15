import React, { useState, useEffect } from "react";
import { DashboarDiv } from "../../pages/Dashboard/style";
import axios from "axios";
import { API_URL } from "../../db/Api";

export default function CadastroLista() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${API_URL}/aluguel`);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <DashboarDiv>
        <div>Ts Administradora - Lista de Pessoas</div>
      </DashboarDiv>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>Inquilino: {user.inquilino}</p>
            <p>Proprietário: {user.proprietario}</p>
            <p>Imóvel: {user.numero_imovel}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

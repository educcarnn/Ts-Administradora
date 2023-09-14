import React from "react";
import { Link } from 'react-router-dom';

function Reajuste({ data }) {
  console.log(data);
  return (
    <div className="reajuste-container">
      <h2>Reajuste</h2>

      <strong>Índice:</strong>
      <p>{data?.detalhesContrato?.reajuste}</p>

      <strong>Último reajuste:</strong>
      <p>{data?.ultimoReajuste}</p>

      <strong>Próximo reajuste:</strong>
      <p>{data?.proximoReajuste}</p>

      <h2>Locador</h2>
      <Link to={`/admin/obter-usuario/${data?.proprietario?.id}`}>
        <p>{data?.inquilino?.id}: {data?.proprietario?.nome}</p>
      </Link>


      <h2>Locatário</h2>
      <Link to={`/admin/obter-usuario/${data?.inquilino?.id}`}>
        <p>{data?.inquilino?.id}: {data?.inquilino?.nome}</p>
      </Link>
    </div>
  );
}

export default Reajuste;

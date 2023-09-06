import React from "react";

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
      <p>{data?.proprietario?.nome}</p>

      <h2>Locatário</h2>

      <p>{data?.inquilino?.nome}</p>
    </div>
  );
}

export default Reajuste;

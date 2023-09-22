import React from "react";

function Anuncio({ title, description, contrato }) {
  return (
    <div>
      <h2>Título do Anúncio:</h2>
      <p>{title}</p>

      <h2>Descrição do Anúncio:</h2>
      <p>{description}</p>

      <h2>Contrato de prestação de serviço</h2>
      <p>{contrato}</p>
      
    </div>
  );
}

export default Anuncio;

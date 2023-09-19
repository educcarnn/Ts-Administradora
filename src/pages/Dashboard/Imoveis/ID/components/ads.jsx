import React from "react";

function Anuncio({ title, description }) {
  return (
    <div>
      <h2>Título do Anúncio:</h2>
      <p>{title}</p>

      <h2>Descrição do Anúncio:</h2>
      <p>{description}</p>
    </div>
  );
}

export default Anuncio;

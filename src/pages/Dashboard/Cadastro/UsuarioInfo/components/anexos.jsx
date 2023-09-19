import React from 'react';

function Anexos({ data }) {
  return (
    <div>
      <h2>Anexos</h2>
      <ul>
        {data.map(anexo => (
          <li key={anexo.id}>
            <a href={anexo.url} target="_blank" rel="noopener noreferrer">
              Anexo: {anexo.id}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Anexos;

import React from 'react';

function Contrato({ dadosContrato }) {
  return (
    <div className="contrato-container">
      <h2>Contrato</h2>

      <strong>Imóvel:</strong>
      <p>{dadosContrato?.imovel}</p>

      <strong>Aluguel:</strong>
      <p>{dadosContrato?.aluguel}</p>

      <strong>Tx de adm:</strong>
      <p>{dadosContrato?.taxaAdm}</p>

      <strong>Repasse:</strong>
      <p>{dadosContrato?.repasse}</p>

      <strong>Tarifa repasse:</strong>
      <p>{dadosContrato?.tarifaRepasse}</p>

      <strong>Tarifa cobrança:</strong>
      <p>{dadosContrato?.tarifaCobranca}</p>

      <strong>End cobrança:</strong>
      <p>{dadosContrato?.enderecoCobranca}</p>

      <strong>Conta bancária:</strong>
      <p>{dadosContrato?.contaBancaria}</p>

      <strong>Forma entrega:</strong>
      <p>{dadosContrato?.formaEntrega}</p>
    </div>
  );
}

export default Contrato;

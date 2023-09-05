import React from 'react';

function Reajuste({ dadosReajuste, locador, locatarios }) {
    return (
        <div className="reajuste-container">
            <h2>Reajuste</h2>

            <strong>Índice:</strong>
            <p>{dadosReajuste?.indice}</p>

            <strong>Último reajuste:</strong>
            <p>{dadosReajuste?.ultimoReajuste}</p>

            <strong>Próximo reajuste:</strong>
            <p>{dadosReajuste?.proximoReajuste}</p>

            <h2>Locador</h2>
            <p>{locador?.nome}</p>

            <h2>Locatários</h2>
            {locatarios.map((locatario, index) => (
                <p key={index}>
                    {locatario?.nome}
                    {locatario?.principal && " (Locatário principal)"}
                </p>
            ))}
        </div>
    );
}

export default Reajuste;

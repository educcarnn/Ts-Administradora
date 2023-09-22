import React from 'react';
import { ColumnContainer } from '../../style';
import { Input } from '@mui/material';

export default function Negociacao({ data, handleInfoChange }) {
    console.log(data)
    const handleChange = (campo, valor) => {
        if (handleInfoChange) {
            handleInfoChange(campo, valor);
        }
    };

    const getFlatData = (data) => {
        return { Tipo: data.Tipo, ...data.valores };
    };

    const camposDeVenda = ["Valor de Venda"];
    const camposDeAluguel = ["Valor de Aluguel", "Taxa de Administração", "Taxa de Locacao"];

    const isRelevantField = (campo) => {
        if (data.Tipo === "venda") {
            return camposDeVenda.includes(campo);
        } else if (data.Tipo === "aluguel") {
            return camposDeAluguel.includes(campo);
        } else if (data.Tipo === "duasopcoes") {
            return [...camposDeVenda, ...camposDeAluguel].some(c => campo.startsWith(c));
        }
        return false;  // caso contrário, não mostrar
    };
    const processedData = getFlatData(data);

    return (
        <>
            {Object.entries(processedData)
                .filter(([campo, valor]) => Number(valor) !== 0 && isRelevantField(campo))
                .map(([campo, valor]) => {
                    if (campo === "tipo" && valor === "duasopcoes") {
                        valor = "Venda e Aluguel";
                    }
                    return (
                        <div key={campo}>
                            <ColumnContainer>
                                <label>{campo}:</label>
                                <Input
                                    type="text"
                                    value={valor.toString() || ""}
                                    disabled
                                    onChange={(e) => handleChange(campo, e.target.value)}
                                />
                            </ColumnContainer>
                        </div>
                    );
                })}
        </>
    );
}

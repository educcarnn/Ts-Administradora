import React from 'react';
import { ColumnContainer } from '../../style';
import { Input } from '@mui/material';

export default function Negociacao({ data, isEditing, handleInfoChange }) {

    console.log(data)

    const handleChange = (campo, valor) => {
        if (handleInfoChange) {
            handleInfoChange(campo, valor);
        }
    };

    // Função auxiliar para obter os dados de 'valores'
    const getFlatData = (data) => {
        let flatData = { ...data };
        delete flatData.valores; // Removendo a chave 'valores' porque vamos adicionar seus valores ao nível superior
        return { ...flatData, ...data.valores };
    };

    const processedData = getFlatData(data);

    return (
        <>
            {Object.entries(processedData)
                .filter(([, valor]) => valor && valor !== 0)
                .map(([campo, valor]) => {
                    if (campo === "Tipo" && valor === "duasopcoes") {
                        valor = "Venda e Aluguel";
                    }
                    return (
                        <div key={campo}>
                            <ColumnContainer>
                                <label>{campo}:</label>
                                <Input
                                    type="text"
                                    value={valor.toString() || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => handleChange(campo, e.target.value)}
                                />
                            </ColumnContainer>
                        </div>
                    );
                })}
        </>
    );
}

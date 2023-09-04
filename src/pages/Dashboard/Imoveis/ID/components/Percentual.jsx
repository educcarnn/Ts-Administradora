import React from 'react';
import { ColumnContainer } from '../../style';
import { Input } from '@mui/material';

export default function Percentual({ data, isEditing, handleInfoChange }) {

    console.log(data)
    return (
        <>
            {Object.entries(data).map(([campo, valor]) => (
                <div key={campo}>
                    <ColumnContainer>
                        <label>{campo}:</label>
                        <Input
                            type="text"
                            value={data.Percentual}
                            disabled={!isEditing}
                            onChange={e => handleInfoChange(campo, e.target.value)}  // Adicione esta linha
                        />
                    </ColumnContainer>
                </div>
            ))}
        </>
    );
}

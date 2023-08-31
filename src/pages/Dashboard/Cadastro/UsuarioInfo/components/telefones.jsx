// Telefones.js
import React from 'react';
import { ColumnContainer } from '../../../Imoveis/style';
import { Input } from '@material-ui/core';

const Telefones = ({ phoneData, isEditing, handleInfoChange }) => {
    return (
        <ColumnContainer>
            {Object.entries(phoneData).map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong>
                    <Input
                        value={value}
                        onChange={(e) => handleInfoChange(key, e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            ))}
        </ColumnContainer>
    );
};

export default Telefones;

import React from 'react';
import { ColumnContainer } from '../../../Imoveis/style';
import { Input } from '@material-ui/core';

const MoreInformations = ({ moreData, isEditing, handleInfoChange }) => {
   

    return (
        <ColumnContainer>
            <strong>Órgão Expedidor:</strong>
            <Input 
                value={moreData["Órgão Expedidor"]}
                onChange={(e) => handleInfoChange("Órgão Expedidor", e.target.value)}
                disabled={!isEditing}
            />
            
            <strong>Data de Nascimento:</strong>
            <Input 
                value={moreData["Data de Nascimento"]}
                onChange={(e) => handleInfoChange("Data de Nascimento", e.target.value)}
                disabled={!isEditing}
            />

            <strong>Profissão:</strong>
            <Input 
                value={moreData["Profissão"]}
                onChange={(e) => handleInfoChange("Profissão", e.target.value)}
                disabled={!isEditing}
            />

            <strong>Estado Civil:</strong>
            <Input 
                value={moreData["Estado Civil"]}
                onChange={(e) => handleInfoChange("Estado Civil", e.target.value)}
                disabled={!isEditing}
            />

            <strong>Nacionalidade:</strong>
            <Input 
                value={moreData["Nacionalidade"]}
                onChange={(e) => handleInfoChange("Nacionalidade", e.target.value)}
                disabled={!isEditing}
            />

            <strong>E-mail:</strong>
            <Input 
                value={moreData["E-mail"]}
                onChange={(e) => handleInfoChange("E-mail", e.target.value)}
                disabled={!isEditing}
            />
        </ColumnContainer>
    );
};

export default MoreInformations;

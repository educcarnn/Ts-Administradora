import React from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input } from "@material-ui/core";

const MoreInformations = ({ moreData, isEditing, handleInfoChange }) => {
  console.log(moreData);
  return (
    <ColumnContainer>
      <strong>Órgão Expedidor:</strong>
      <Input value={moreData?.orgaoExpedidor} disabled={!isEditing} />

      <strong>Data de Nascimento:</strong>
      <Input value={moreData?.dataNascimento} disabled={!isEditing} />

      <strong>Profissão:</strong>
      <Input value={moreData?.profissao} disabled={!isEditing} />

      <strong>Estado Civil:</strong>
      <Input value={moreData?.estadoCivil} disabled={!isEditing} />

      <strong>Nacionalidade:</strong>
      <Input value={moreData?.nacionalidade} disabled={!isEditing} />
    </ColumnContainer>
  );
};

export default MoreInformations;

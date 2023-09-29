import React from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input } from "@material-ui/core";

const MoreInformations = ({ moreData, isEditing, handleMoreInformations }) => {
  // Função para corrigir a data de nascimento
  function corrigirDataNascimento(data) {
    if (!data) return ""; 
    const dataLocal = new Date(data);
    dataLocal.setDate(dataLocal.getDate() + 1);

    const anoCorrigido = dataLocal.getFullYear();
    const mesCorrigido = String(dataLocal.getMonth()).padStart(2, "0");
    const diaCorrigido = String(dataLocal.getDate() + 1).padStart(2, "0");

    return `${diaCorrigido}-${mesCorrigido}-${anoCorrigido}`;
  }

  const dataNascimentoField = isEditing ? (
    <Input
      type="date"
      value={moreData?.dataNascimento}
      onChange={(e) => handleMoreInformations("dataNascimento", e.target.value)}
      inputProps={{ style: { textAlign: "center" } }} // Centraliza o texto no campo de data
    />
  ) : (
    <Input
      value={corrigirDataNascimento(moreData?.dataNascimento)}
      disabled={!isEditing}
      inputProps={{ locale: "pt-BR" }}
    />
  );

  return (
    <ColumnContainer>
      <strong>Órgão Expedidor:</strong>
      <Input
        value={moreData?.orgaoExpedidor}
        disabled={!isEditing}
        onChange={(e) => handleMoreInformations("orgaoExpedidor", e.target.value)}
      />
      
      <strong>Data de Nascimento:</strong>
      {dataNascimentoField}

      <strong>Profissão:</strong>
      <Input
        value={moreData?.profissao}
        disabled={!isEditing}
        onChange={(e) => handleMoreInformations("profissao", e.target.value)}
      />

      <strong>Estado Civil:</strong>
      <Input
        value={moreData?.estadoCivil}
        disabled={!isEditing}
        onChange={(e) => handleMoreInformations("estadoCivil", e.target.value)}
      />

      <strong>Nacionalidade:</strong>
      <Input
        value={moreData?.nacionalidade}
        disabled={!isEditing}
        onChange={(e) => handleMoreInformations("nacionalidade", e.target.value)}
      />
    </ColumnContainer>
  );
};

export default MoreInformations;

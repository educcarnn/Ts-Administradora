import React from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input,   MenuItem, Select } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR"; // Importe o locale diretamente

const MoreInformations = ({ moreData, isEditing, handleMoreInformations }) => {
  function formatarDataParaBrasileiro(data) {
    if (!data) return "";
  
    const partes = data.split('-');
    if (partes.length !== 3) return ""; // Data inválida
  
    const [ano, mes, dia] = partes;
    if (!dia || !mes || !ano) return ""; // Data inválida
  
    return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
  }
  return (
    <ColumnContainer>
      <strong>Órgão Expedidor:</strong>
      <Input
        value={moreData?.orgaoExpedidor}
        disabled={!isEditing}
        onChange={(e) =>
          handleMoreInformations("orgaoExpedidor", e.target.value)
        }
      />

      <strong>Data de Nascimento:</strong>
      {isEditing ? (
        <Input
          type="date"
          onChange={(e) =>
            handleMoreInformations("dataNascimento", e.target.value)
          }
        />
      ) : (
        <Input
          value={formatarDataParaBrasileiro(moreData?.dataNascimento)}
          disabled={!isEditing}
        />
      )}

      <strong>Profissão:</strong>
      <Input
        value={moreData?.profissao}
        disabled={!isEditing}
        onChange={(e) => handleMoreInformations("profissao", e.target.value)}
      />

      <strong>Estado Civil:</strong>
      <Select
        disabled={!isEditing}
        value={moreData?.estadoCivil}
        onChange={(e) => handleMoreInformations("estadoCivil", e.target.value)}
      >
        <MenuItem value={"Víuva"}>Víuvo (a)</MenuItem>
        <MenuItem value={"Divorciado"}>Divorciado (a)</MenuItem>
        <MenuItem value={"Casado"}>Casado (a)</MenuItem>
        <MenuItem value={"Solteiro"}>Solteiro (a)</MenuItem>
      </Select>

      <strong>Nacionalidade:</strong>
      <Input
        value={moreData?.nacionalidade}
        disabled={!isEditing}
        onChange={(e) =>
          handleMoreInformations("nacionalidade", e.target.value)
        }
      />
    </ColumnContainer>
  );
};

export default MoreInformations;

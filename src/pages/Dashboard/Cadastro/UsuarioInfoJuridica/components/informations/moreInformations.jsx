import React from "react";
import { ColumnContainer } from "../../../../Imoveis/style";
import { Input } from "@material-ui/core";

const MoreInformations = ({ moreData, isEditing, handleMoreInformations }) => {
  // Função para corrigir a data
  function corrigirData(data) {
    if (!data) return ""; // Retorna uma string vazia se não houver data
    const dataLocal = new Date(data);
    dataLocal.setDate(dataLocal.getDate() + 1);

    // Formata a data para o formato "AAAA-MM-DD"
    const anoCorrigido = dataLocal.getFullYear();
    const mesCorrigido = String(dataLocal.getMonth()).padStart(2, "0");
    const diaCorrigido = String(dataLocal.getDate() + 1).padStart(2, "0");

    return `${diaCorrigido}-${mesCorrigido}-${anoCorrigido}`;
  }

  const dataAberturaEmpresaField = isEditing ? (
    <Input
      type="date"
      value={moreData?.dataAberturaEmpresa}
      onChange={(e) =>
        handleMoreInformations("dataAberturaEmpresa", e.target.value)
      }
      inputProps={{ style: { textAlign: "center" } }}
    />
  ) : (
    <Input
      value={corrigirData(moreData?.dataAberturaEmpresa)}
      disabled={!isEditing}
      inputProps={{ locale: "pt-BR" }}
    />
  );

  return (
    <ColumnContainer>
      <strong>Data de Abertura da Empresa:</strong>
      {dataAberturaEmpresaField}

      <strong>Sócio Administrador:</strong>
      <Input
        value={moreData?.novoSocioAdministrador}
        disabled={!isEditing}
        onChange={(e) =>
          handleMoreInformations("novoSocioAdministrador", e.target.value)
        }
      />
    </ColumnContainer>
  );
};

export default MoreInformations;

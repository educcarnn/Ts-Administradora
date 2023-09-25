import React, { useState, useEffect } from "react";
import { Input, Typography, Checkbox } from "@mui/material";
import { ColumnContainer } from "../../../style";

const CondominioComponente = ({
  tipoCondominio,
  condominio,
  isEditing,
  handleCondominioChange,
  handleTipoCondominio,
}) => {
  const [naoIsento, setNaoIsento] = useState(
    tipoCondominio.tipoCondominio === "Não Isento"
  );

  useEffect(() => {
    setNaoIsento(tipoCondominio.tipoCondominio === "Não Isento");
  }, [tipoCondominio]);

  const handleChangeTipoCondominio = (novoTipo) => {
    setNaoIsento(novoTipo === "Não Isento");
    handleTipoCondominio(novoTipo);
  };

  const handleCnpjChange = (valor) => {
    // Remove caracteres não numéricos do CNPJ
    const cnpj = valor.replace(/\D/g, "");

    // Formata o CNPJ
    const formattedCnpj = cnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    handleCondominioChange("cnpj", formattedCnpj);
  };

  const nomeAmigavelDosCampos = {
    site: "Site",
    login: "Login",
    cnpj: "CNPJ",
    senha: "Senha",
    razao_social: "Razão Social",
  };

  return (
    <>
      <Checkbox
        checked={!naoIsento}
        onChange={() => handleChangeTipoCondominio("Isento")}
        disabled={!isEditing}
      />
      <label>Isento</label>

      <Checkbox
        checked={naoIsento}
        onChange={() => handleChangeTipoCondominio("Não Isento")}
        disabled={!isEditing}
      />
      <label>Não Isento</label>

      {naoIsento && (
        <>
          <div>
            <label>{nomeAmigavelDosCampos.cnpj}:</label>
            <Input
              type="text"
              value={condominio?.condominio.cnpj || ""}
              disabled={!isEditing}
              onChange={(e) => handleCnpjChange(e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.site}:</label>
            <Input
              type="text"
              value={condominio?.condominio.site || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("site", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.login}:</label>
            <Input
              type="text"
              value={condominio?.condominio.login || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("login", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.senha}:</label>
            <Input
              type="text"
              value={condominio?.condominio.senha || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("senha", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.razao_social}:</label>
            <Input
              type="text"
              value={condominio?.condominio.razao_social || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleCondominioChange("razao_social", e.target.value)
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export default CondominioComponente;

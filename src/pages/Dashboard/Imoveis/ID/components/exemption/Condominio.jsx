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
    tipoCondominio.tipoCondominio === "NaoIsento"
  );

  useEffect(() => {
    setNaoIsento(tipoCondominio.tipoCondominio === "NaoIsento");
  }, [tipoCondominio]);

  const handleChangeTipoCondominio = (novoTipo) => {
    setNaoIsento(novoTipo === "NaoIsento");
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
    nome_administradora: "Nome Administradora",
    site: "Site",
    login: "Login",
    cnpj: "CNPJ",
    senha: "Senha",
    razao_social: "Razão Social",
    nome_condominio: "Nome Condomínio",
    valor_mensal: "Valor Mensal",
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
        onChange={() => handleChangeTipoCondominio("NaoIsento")}
        disabled={!isEditing}
      />
      <label>Não Isento</label>

      {naoIsento && (
        <>
          <div>
            <label>{nomeAmigavelDosCampos.nome_administradora}:</label>
            <Input
              type="text"
              value={condominio?.nome_administradora || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleCondominioChange("nome_administradora", e.target.value)
              }
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.site}:</label>
            <Input
              type="text"
              value={condominio?.site || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("site", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.login}:</label>
            <Input
              type="text"
              value={condominio?.login || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("login", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.senha}:</label>
            <Input
              type="text"
              value={condominio?.senha || ""}
              disabled={!isEditing}
              onChange={(e) => handleCondominioChange("senha", e.target.value)}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.razao_social}:</label>
            <Input
              type="text"
              value={condominio?.razao_social || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleCondominioChange("razao_social", e.target.value)
              }
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.cnpj}:</label>
            <Input
              type="text"
              value={condominio?.cnpj || ""}
              disabled={!isEditing}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 14) {
                  e.target.value = value.replace(
                    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    "$1.$2.$3/$4-$5"
                  );
                } else {
                  e.target.value = value
                    .substring(0, 14)
                    .replace(
                      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                      "$1.$2.$3/$4-$5"
                    );
                }

                handleCondominioChange("cnpj", e.target.value);
              }}
              maxLength="18"
              onKeyPress={(event) => {
                if (event.which < 48 || event.which > 57) {
                  event.preventDefault();
                }
              }}
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.nome_condominio}:</label>
            <Input
              type="text"
              value={condominio?.nome_condominio || ""}
              disabled={!isEditing}
              onChange={(e) =>
                handleCondominioChange("nome_condominio", e.target.value)
              }
            />
          </div>
          <div>
            <label>{nomeAmigavelDosCampos.valor_mensal} R$:</label>
            <Input
              type="text"
              value={condominio?.valor_mensal || ""}
              disabled={!isEditing}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                const formattedValue = value.replace(
                  /(\d)(?=(\d{3})+(?!\d))/g,
                  "$1."
                ); // Formata como 1.000.000

                handleCondominioChange("valor_mensal", formattedValue);
              }}
              maxLength="18"
              placeholder="0.00" // Opcional: define um placeholder para o formato esperado
            />
          </div>
        </>
      )}
    </>
  );
};

export default CondominioComponente;

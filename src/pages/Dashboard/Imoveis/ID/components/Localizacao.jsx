import React, { useState } from "react";
import { ColumnContainer } from "../../style";
import { Input } from "@mui/material";

export default function CamposLocalizacao({
  camposLocalizacao,
  isEditing,
  handleInfoChange,
}) {
  const [enderecoInfo, setEnderecoInfo] = useState({
    Bairro: camposLocalizacao?.Bairro || "",
    Cidade: camposLocalizacao?.Cidade || "",
    Estado: camposLocalizacao?.Estado || "",
    Endereco: camposLocalizacao?.endereco || "", // Usar "endereco" em minúsculas
  });

  const handleCEPChange = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setEnderecoInfo({
          Bairro: data.bairro,
          Cidade: data.localidade,
          Estado: data.uf,
          Endereco: data.logradouro, // Usar "logradouro" em minúsculas
        });

        handleInfoChange("Bairro", data.bairro);
        handleInfoChange("Cidade", data.localidade);
        handleInfoChange("Estado", data.uf);
        handleInfoChange("endereco", data.logradouro); // Usar "endereco" em minúsculas
      } else {
        console.error("CEP não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <>
      <ColumnContainer>
        <label>CEP:</label>
        <Input
          type="text"
          value={camposLocalizacao?.CEP || ""}
          disabled={!isEditing}
          onChange={(e) => {
            const cep = e.target.value;
            handleInfoChange("CEP", cep);
            if (cep.length === 8) {
              handleCEPChange(cep);
            }
          }}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Bairro:</label>
        <Input type="text" disabled value={enderecoInfo.Bairro} />
      </ColumnContainer>

      <ColumnContainer>
        <label>Cidade:</label>
        <Input type="text" disabled value={enderecoInfo.Cidade} />
      </ColumnContainer>

      <ColumnContainer>
        <label>Endereço:</label>
        <Input type="text" disabled value={enderecoInfo.Endereco} />
      </ColumnContainer>
      <ColumnContainer>
        <label>Estado:</label>
        <Input type="text" disabled value={enderecoInfo.Estado} />
      </ColumnContainer>
      <ColumnContainer>
        <label>Número:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Numero || ""}
          disabled={!isEditing}
          onChange={(e) => handleInfoChange("Numero", e.target.value)}
        />
      </ColumnContainer>
      <ColumnContainer>
        <label>Complemento:</label>
        <Input
          type="text"
          value={camposLocalizacao?.Complemento || ""}
          disabled={!isEditing}
          onChange={(e) => handleInfoChange("Complemento", e.target.value)}
        />
      </ColumnContainer>
    </>
  );
}

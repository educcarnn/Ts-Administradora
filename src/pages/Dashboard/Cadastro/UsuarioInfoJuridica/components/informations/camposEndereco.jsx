import React, { useEffect } from "react";
import { Input, Typography } from "@mui/material";

const Endereco = ({ addressData, handleInfoChange, isEditing }) => {
  // Função para buscar informações do CEP
  const buscarCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      // Atualizar os campos com os dados do CEP
      handleInfoChange("bairro", data.bairro);
      handleInfoChange("cidade", data.localidade);
      handleInfoChange("endereco", data.logradouro);
      handleInfoChange("estado", data.uf);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };


  useEffect(() => {
    if (!isEditing) return; // Não buscar se não estiver editando

    if (addressData.cep.length === 8) {
      // Realizar a busca apenas se o CEP tiver 8 dígitos
      buscarCEP(addressData.cep);
    }
  }, [addressData.cep, isEditing, handleInfoChange]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Endereço
      </Typography>
      <div>
        <strong>CEP:</strong>
        {isEditing ? (
          <Input
            value={addressData.cep}
            onChange={(e) => handleInfoChange("cep", e.target.value)}
          />
        ) : (
          <span>{addressData.cep}</span>
        )}
      </div>

      <div>
        <strong>Bairro:</strong>
        {isEditing ? (
          <Input
            value={addressData.bairro}
            disabled
            onChange={(e) => handleInfoChange("bairro", e.target.value)}
          />
        ) : (
          <span>{addressData.bairro}</span>
        )}
      </div>

      <div>
        <strong>Cidade:</strong>
        {isEditing ? (
          <Input
            value={addressData.cidade}
            disabled
            onChange={(e) => handleInfoChange("cidade", e.target.value)}
          />
        ) : (
          <span>{addressData.cidade}</span>
        )}
      </div>

      <div>
        <strong>Endereço:</strong>
        {isEditing ? (
          <Input
            value={addressData.endereco}
            disabled
            onChange={(e) => handleInfoChange("endereco", e.target.value)}
          />
        ) : (
          <span>{addressData.endereco}</span>
        )}
      </div>

      <div>
        <strong>Estado:</strong>
        {isEditing ? (
          <Input
            value={addressData.estado}
            disabled
            onChange={(e) => handleInfoChange("estado", e.target.value)}
          />
        ) : (
          <span>{addressData.estado}</span>
        )}
      </div>
    </div>
  );
};

export default Endereco;

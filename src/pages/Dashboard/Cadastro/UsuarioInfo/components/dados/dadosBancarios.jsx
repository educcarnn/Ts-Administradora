import React, { useState, useEffect } from "react";
import { Input, Typography, Checkbox } from "@mui/material";

const DadosBancarios = ({ bankerData, handleInfoChange, isEditing, handleTipoPagamento, tipoPagamento }) => {
  const [pixSelecionado, setPixSelecionado] = useState(false);
  const [tedSelecionado, setTedSelecionado] = useState(false);

  useEffect(() => {
    // Verificar o tipo de pagamento e marcar a opção apropriada
    if (tipoPagamento.tipoPagamento === "PIX") {
      setPixSelecionado(true);
      setTedSelecionado(false);
    } else if (tipoPagamento.tipoPagamento === "TED") {
      setPixSelecionado(false);
      setTedSelecionado(true);
    }
  }, [tipoPagamento]);

  const handleCheckboxChange = (opcao) => {
    if (opcao === "PIX") {
      setPixSelecionado(!pixSelecionado);
      setTedSelecionado(false); // Desmarcar TED quando PIX é selecionado
    } else if (opcao === "TED") {
      setTedSelecionado(!tedSelecionado);
      setPixSelecionado(false); // Desmarcar PIX quando TED é selecionado
    }
    handleTipoPagamento(opcao); // Chamar a função handleTipoPagamento com a opção selecionada
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Forma de pagamento
      </Typography>
      <div>
        <label>
          <Checkbox
            checked={pixSelecionado}
            onChange={() => handleCheckboxChange("PIX")}
            disabled={!isEditing}
          />
          PIX
        </label>
      </div>
      <div>
        <label>
          <Checkbox
            checked={tedSelecionado}
            onChange={() => handleCheckboxChange("TED")}
            disabled={!isEditing}
          />
          TED
        </label>
      </div>
      {pixSelecionado && (
        <div>
          <label>Chave Pix:</label>
          <Input
            value={bankerData.chavePix || ""}
            onChange={(e) => handleInfoChange("chavePix", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      )}
      {tedSelecionado && (
        <div>
          <label>Banco:</label>
          <Input
            value={bankerData.banco || ""}
            onChange={(e) => handleInfoChange("banco", e.target.value)}
            disabled={!isEditing}
          />
          <label>Conta:</label>
          <Input
            value={bankerData.conta || ""}
            onChange={(e) => handleInfoChange("conta", e.target.value)}
            disabled={!isEditing}
          />
          <label>Agência:</label>
          <Input
            value={bankerData.agencia || ""}
            onChange={(e) => handleInfoChange("agencia", e.target.value)}
            disabled={!isEditing}
          />
        </div>
      )}
    </div>
  );
};

export default DadosBancarios;

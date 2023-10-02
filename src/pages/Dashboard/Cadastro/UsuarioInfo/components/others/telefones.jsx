import React from "react";
import { Input, Typography } from "@mui/material";

const Telefones = ({ phoneData, handleTelefoneChange, isEditing }) => {
  return (
    <>
      <div>
        <strong>Telefone Fixo:</strong>
        {isEditing ? (
          <Input
            maxLength="14" // Aumente o maxLength para a formatação correta (com parênteses e hífen)
            onKeyDown={(event) => {
              const allowedKeyCodes = [8, 9, 13, 27, 46]; // Permitir teclas de controle (Backspace, Tab, Enter, Esc, Delete)
              if (
                (event.key >= "0" && event.key <= "9") ||
                allowedKeyCodes.includes(event.keyCode)
              ) {
                return;
              }
              event.preventDefault();
            }}
            onBlur={(event) => {
              let value = event.target.value.replace(/\D/g, ""); // Remover não dígitos
              if (value.length === 10) {
                // Formatar como (XX) XXXX-XXXX
                event.target.value = `(${value.substring(
                  0,
                  2
                )}) ${value.substring(2, 6)}-${value.substring(6)}`;
              }
            }}
            value={phoneData.telefoneFixo}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remover não dígitos
              if (value.length <= 10) {
                e.target.value = value.replace(
                  /(\d{2})(\d{4})(\d{4})/,
                  "($1) $2-$3"
                );
              }
              handleTelefoneChange("telefoneFixo", e.target.value);
            }}
          />
        ) : (
          <Input disabled={!isEditing} value={phoneData.telefoneFixo} />
        )}
      </div>

      <div>
        <strong>Telefone Celular:</strong>
        {isEditing ? (
          <Input
            value={phoneData.telefoneCelular}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remover não dígitos
              if (value.length <= 11) {
                // Permitir no máximo 11 dígitos (incluindo parênteses e hífen)
                e.target.value = value.replace(
                  /(\d{2})(\d{5})(\d{4})/,
                  "($1) $2-$3"
                );
              }
              handleTelefoneChange("telefoneCelular", e.target.value);
            }}
            maxLength="14"
            onKeyPress={(event) => {
              if (event.which < 48 || event.which > 57) {
                event.preventDefault();
              }
            }}
          />
        ) : (
          <Input disabled={!isEditing} value={phoneData.telefoneCelular} />
        )}
      </div>
    </>
  );
};

export default Telefones;

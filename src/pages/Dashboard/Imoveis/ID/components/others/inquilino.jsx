import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "react-router-dom/Link";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL } from "../../../../../../db/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function StatusImovel({ imovelInfo, isEditing }) {

    const [inquilinos, setInquilinos] = useState(imovelInfo.inquilinos);

  const handleRemoveInquilino = async (inquilinoId) => {
    try {
      const response = await API_URL.delete("/deletar-inquilino", {
        data: { inquilinoId },
      });

      // Lógica de tratamento de sucesso
      toast.success("Inquilino excluído com sucesso", response.data);
      console.log(response.data); // Exemplo: exibir a resposta da API
      const updatedInquilinos = inquilinos.filter((inquilino) => inquilino.id !== inquilinoId);
      setInquilinos(updatedInquilinos);
      // Adicione aqui qualquer outra lógica que você precise após a remoção bem-sucedida
    } catch (error) {
      // Lógica de tratamento de erro
      console.error("Erro ao excluir inquilino:", error);
      toast.error("Erro ao excluir inquilino:", error);
    }
  };

    return (
    <Box marginTop={2} marginBottom={2}>
      <Typography variant="h6">Status:</Typography>
      {inquilinos &&
        (inquilinos.length === 0 ? (
          <Typography>Disponível para locação</Typography>
        ) : (
          <>
            <Typography>Locado para:</Typography>
            {inquilinos.map((inquilino) => (
              <div key={inquilino.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/admin/obter-usuario/${inquilino?.pessoa?.id}`}>
                  <Typography variant="subtitle1" color="primary">
                    {inquilino?.pessoa?.nome}
                  </Typography>
                </Link>
                {isEditing && (
                  <IconButton
                    aria-label="Remover"
                    color="secondary"
                    onClick={() => handleRemoveInquilino(inquilino.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </>
        ))}
    </Box>
  );
}

export default StatusImovel;

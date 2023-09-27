import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link, TextField, Button } from "@material-ui/core";
import { toast } from "react-toastify"; // Importe o toast para exibir mensagens de sucesso/erro
import { API_URL } from "../../../../../../db/Api";

function ProprietariosComponent({ proprietarios, isEditing }) {
  const [novoProprietario, setNovoProprietario] = useState("");
  const [proprietariosEditados, setProprietariosEditados] = useState(
    proprietarios.imoveisProprietarios || []
  );

  const adicionarProprietario = () => {
  

    const novoProprietarioId = Date.now();

    setProprietariosEditados([
      ...proprietariosEditados,
      {
        id: novoProprietarioId,
        percentual: parseFloat(novoProprietario) || 0,
        tipo: "Física",
      },
    ]);

    setNovoProprietario("");
  };

  const removerProprietario = async (proprietarioId) => {
    try {
      await API_URL.delete("/deletar-proprietario", {
        data: { proprietarioId },
      });

      toast.success("Proprietário excluído com sucesso");
      const novaListaProprietarios = proprietariosEditados.filter(
        (proprietario) => proprietario.id !== proprietarioId
      );
      setProprietariosEditados(novaListaProprietarios);
    } catch (error) {
      console.error("Erro ao excluir proprietário:", error);
      toast.error("Erro ao excluir proprietário:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6">Proprietários</Typography>

      {proprietariosEditados.map((proprietarioInfo) => (
        <div key={proprietarioInfo.id}>
          {proprietarioInfo?.pessoa ? (
            <div>
              <Link
                component={RouterLink}
                to={`/admin/obter-usuario/${proprietarioInfo.pessoa.id}`}
              >
                <Typography>
                  {`${proprietarioInfo?.pessoa?.nome} - ${proprietarioInfo?.percentualPropriedade}%`}
                </Typography>
              </Link>
              {isEditing && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removerProprietario(proprietarioInfo.id)}
                >
                  Remover
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Typography>
                {`${proprietarioInfo?.pessoaJuridica?.razaoSocial} - ${proprietarioInfo?.percentualPropriedade}% (CNPJ: ${proprietarioInfo?.pessoaJuridica?.cnpj})`}
              </Typography>
              {isEditing && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removerProprietario(proprietarioInfo.id)}
                >
                  Remover
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
     
    </div>
  );
}

export default ProprietariosComponent;

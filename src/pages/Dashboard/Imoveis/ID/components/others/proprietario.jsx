import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link, Button, Input } from "@material-ui/core";
import { toast } from "react-toastify";
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

  const handlePercentualChange = (event, proprietarioId) => {
    const novoValor = event.target.value;
    const novaListaProprietarios = proprietariosEditados.map((proprietario) =>
      proprietario.id === proprietarioId
        ? { ...proprietario, percentual: parseFloat(novoValor) || 0 }
        : proprietario
    );
    setProprietariosEditados(novaListaProprietarios);
  };
  console.log(proprietariosEditados);
  return (
    <div>
      <Typography variant="h6">Proprietários</Typography>
      {proprietariosEditados.map((proprietarioInfo) => (
        <div key={proprietarioInfo?.id}>
          {isEditing ? (
            <div>
              {proprietarioInfo?.pessoa ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={`/admin/obter-usuario/${proprietarioInfo?.pessoa?.id}`}
                  >
                    <Typography>
                      {`${proprietarioInfo?.pessoa?.nome} - `}
                    </Typography>
                  </Link>
                  <Typography>
                    {proprietarioInfo?.percentualPropriedade}%
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removerProprietario(proprietarioInfo?.id)}
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div>
                  <Link
                    component={RouterLink}
                    to={`/admin/obter-usuario-juridica/${proprietarioInfo?.pessoaJuridica?.id}`}
                  >
                    <Typography>
                      {`${proprietarioInfo?.pessoaJuridica?.razaoSocial} - `}
                    </Typography>
                    <Typography>
                      {proprietarioInfo?.percentualPropriedade}%
                    </Typography>
                  </Link>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removerProprietario(proprietarioInfo?.id)}
                  >
                    Remover
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {proprietarioInfo?.pessoa ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={`/admin/obter-usuario/${proprietarioInfo?.pessoa?.id}`}
                  >
                    <Typography>
                      {`${proprietarioInfo?.pessoa?.nome} - ${proprietarioInfo?.percentualPropriedade}%`}
                    </Typography>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    component={RouterLink}
                    to={`/admin/obter-usuario-juridica/${proprietarioInfo?.pessoaJuridica?.id}`}
                  >
                    <Typography>
                      {`${proprietarioInfo?.pessoaJuridica?.razaoSocial} - ${proprietarioInfo?.percentualPropriedade}%`}
                    </Typography>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProprietariosComponent;

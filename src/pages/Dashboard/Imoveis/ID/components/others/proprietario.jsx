import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link, Button, Input } from "@material-ui/core";
import { toast } from "react-toastify";
import { API_URL } from "../../../../../../db/Api";
import { useEffect } from "react";

function ProprietariosComponent({
  proprietarios,
  isEditing,
  submit,
  setSubmit,
  setProprietarios,
}) {
  console.log(submit);
  const [novoProprietario, setNovoProprietario] = useState("");
  const [proprietariosEditados, setProprietariosEditados] = useState(
    proprietarios.imoveisProprietarios || []
  );

  const handleProprietarioPercentualChange = (
    proprietarioId,
    novoPercentual
  ) => {
    const novosProprietariosEditados = proprietariosEditados.map(
      (proprietario) => {
        if (proprietario.id === proprietarioId) {
          // Se o ID do proprietário corresponder, atualize o percentual
          return {
            ...proprietario,
            percentualPropriedade: novoPercentual,
          };
        }
        return proprietario;
      }
    );

    setProprietariosEditados(novosProprietariosEditados);
  };

  useEffect(() => {
    if (submit) {
      const proprietarioData = {
        imoveisProprietarios: [...proprietariosEditados],
      };
      console.log(proprietarioData);
      console.log(proprietariosEditados);
      try {
        API_URL.patch("/atualizar-proprietario", proprietarioData).catch(
          (error) => {
            console.error("Erro na solicitação PATCH:", error);
          }
        );
      } catch (error) {
        console.error("Erro ao atualizar sócio:", error);
      }
    }
  }, [submit, proprietarios]);

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
                  <Input
                    value={proprietarioInfo?.percentualPropriedade}
                    onChange={(e) =>
                      handleProprietarioPercentualChange(
                        proprietarioInfo.id,
                        e.target.value
                      )
                    }
                  />
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
                  </Link>
                  <Input
                    value={proprietarioInfo?.percentualPropriedade}
                    onChange={(e) =>
                      handleProprietarioPercentualChange(
                        proprietarioInfo.id,
                        e.target.value
                      )
                    }
                  />
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

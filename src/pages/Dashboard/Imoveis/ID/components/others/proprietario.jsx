import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link, TextField, Button } from "@material-ui/core";

function ProprietariosComponent({ proprietarios, isEditing }) {
  const [novoProprietario, setNovoProprietario] = useState("");
  const [proprietariosEditados, setProprietariosEditados] = useState(
    proprietarios.imoveisProprietarios || []
  );

  const adicionarProprietario = () => {
    if (novoProprietario.trim() === "") {
      return;
    }

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

  const removerProprietario = (proprietarioId) => {
    const novaListaProprietarios = proprietariosEditados.filter(
      (proprietario) => proprietario.id !== proprietarioId
    );
    setProprietariosEditados(novaListaProprietarios);
  };

  return (
    <div>
      <Typography variant="h6">Proprietários</Typography>
      {isEditing && (
        <div>
          <TextField
            label="Percentual do Novo Proprietário"
            value={novoProprietario}
            onChange={(e) => setNovoProprietario(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={adicionarProprietario}
          >
            Adicionar
          </Button>
        </div>
      )}
      {proprietariosEditados.map((proprietarioInfo) => (
        <div key={proprietarioInfo.id}>
          {proprietarioInfo?.pessoa? (
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

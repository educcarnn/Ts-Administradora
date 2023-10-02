import React, { useState } from "react";
import { Label } from "../../Pessoa/PessoaFisica";
import { TextField, Button, Grid, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"; // Importe o ícone de exclusão

export default function SocioAdministrador({ register, errors, setValue }) {
  const [socios, setSocios] = useState([{ id: 1, nome: "" }]);

  const adicionarSocio = () => {
    const novoId = socios.length + 1;
    setSocios([...socios, { id: novoId, nome: "" }]);
  };

  const handleNomeChange = (id, value) => {
    const updatedSocios = socios.map((socio) =>
      socio.id === id ? { ...socio, nome: value } : socio
    );
    setSocios(updatedSocios);
  
    // Atualizar o objeto de valores usando setValue
    updatedSocios.forEach((socio) => {
      // Use setValue para atualizar o campo do formulário associado ao nome do sócio administrador
      setValue(`socioData[${socio.id - 1}].nome`, socio.nome);
    });
  };
  
  const removerSocio = (id) => {
    const updatedSocios = socios.filter((socio) => socio.id !== id);
    setSocios(updatedSocios);
  
    // Atualizar o objeto de valores usando setValue
    updatedSocios.forEach((socio) => {
      // Use setValue para remover o campo do formulário associado ao sócio administrador removido
      setValue(`socioData[${socio.id - 1}].nome`, "");
    });
  };

  return (
    <>
      <Label>Sócios Administradores:</Label>
      {socios.map((socio) => (
        <Grid container spacing={2} key={socio.id}>
          <Grid item xs={10}>
            <TextField
              type="text"
              label="Nome"
              value={socio.nome}
              onChange={(e) => handleNomeChange(socio.id, e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => removerSocio(socio.id)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" color="primary" onClick={adicionarSocio}>
        Adicionar Sócio
      </Button>
    </>
  );
}

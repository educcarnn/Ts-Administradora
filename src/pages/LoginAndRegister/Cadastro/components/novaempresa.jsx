import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { API_URL } from "../../../../db/Api";

function CriarEmpresa() {
  const [empresaData, setEmpresaData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
  });

  const [mostrarCampos, setMostrarCampos] = useState(false);

  const handleSubmit = () => {
  
    const novaEmpresa = {
      empresa: empresaData.empresa,
      endereco: empresaData.endereco,
      telefone: empresaData.telefone,
      email: empresaData.email, 
    };

    API_URL.post("/empresa/cadastrar-empresa", novaEmpresa)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Houve um erro:", error);
        alert("Erro ao criar empresa.");
      });
  };

  return (
    <div>
      <Paper style={{ padding: 20, maxWidth: 400, margin: "20px auto" }}>
        <Typography variant="h6">Cadastrar Nova Empresa</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setMostrarCampos(!mostrarCampos)}
        >
          {mostrarCampos ? "Ocultar Campos" : "Mostrar Campos"}
        </Button>
        {mostrarCampos && (
          <>
            <TextField
              fullWidth
              label="Nome da empresa"
              value={empresaData.empresa}
              onChange={(e) =>
                setEmpresaData({ ...empresaData, empresa: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Endereço"
              value={empresaData.endereco}
              onChange={(e) =>
                setEmpresaData({ ...empresaData, endereco: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Telefone"
              value={empresaData.telefone}
              onChange={(e) =>
                setEmpresaData({ ...empresaData, telefone: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="E-mail" 
              value={empresaData.email}
              onChange={(e) =>
                setEmpresaData({ ...empresaData, email: e.target.value })
              }
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Enviar convite para nova empresa
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}

export default CriarEmpresa;

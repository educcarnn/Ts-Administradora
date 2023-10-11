import React, { useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { API_URL } from "../../../../db/Api";

export default function Convite() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (role === "user" || role === "admin" || role === "userjur") {
  
      const empresaId = localStorage.getItem("empresaId");

      if (!empresaId) {
        alert("EmpresaId não encontrado no Local Storage.");
        return;
      }

      const userData = {
        email: email,
        empresaId: empresaId, 
        role: role,
      };
   

      API_URL.post("/users/invite-admin", userData)
        .then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Houve um erro:", error);
          alert("Convite Enviado.");
        });
    } else {
      alert("Selecione um tipo de usuário.");
    }
  };

  return (
    <div>
      <Paper style={{ padding: 20, maxWidth: 400, margin: "20px auto" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6">Convite</Typography>
          <Tooltip
            title={
              <>
                <Typography variant="body2" component="div" gutterBottom>
                  Gere convites de acesso, enviados por e-mail para usuários e
                  administradores.
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  <strong>Obs:</strong>
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  - Coloque o melhor e-mail da pessoa;
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                  - Não selecione permissão errada, isso pode dar acesso
                  indevido a pessoas mal-intencionadas.
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  style={{ marginLeft: 20 }}
                >
                  (Ex: Uma pessoa física com acesso de administrador, podendo
                  ver detalhes específicos para funcionários da empresa)
                </Typography>
              </>
            }
          >
            <InfoOutlinedIcon
              style={{ marginLeft: "8px", cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <FormLabel component="legend">Tipo de usuário</FormLabel>
        <RadioGroup value={role} onChange={(e) => setRole(e.target.value)}>
          <FormControlLabel value="user" control={<Radio />} label="Física" />
          <FormControlLabel
            value="userjur"
            control={<Radio />}
            label="Jurídica"
          />

          <FormControlLabel
            value="admin"
            control={<Radio />}
            label="Administrador"
          />
        </RadioGroup>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Enviar Convite
        </Button>
      </Paper>
    </div>
  );
}

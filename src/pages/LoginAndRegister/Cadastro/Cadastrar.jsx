import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Typography,
} from "@material-ui/core";
import { DashboarDiv } from "../../Dashboard/style";
import Sidebar from "../../../components/DashboardComponents/Sidebar";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Box from "@mui/material/Box";
import { API_URL } from "../../../db/Api";
import wallpaper from "../../../assets/Images/empresa.jpg";


const backgroundStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1, 
  opacity: 0.5, 
};

function Cadastro() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    if (role === "user" || role === "admin" || role === "Jurídica") {
      const userData = {
        email: email,
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
      <DashboarDiv>Ts Administradora - Empresa</DashboarDiv>
      <Sidebar />
      <img src={wallpaper} alt="Plano de Fundo" style={backgroundStyle}/>
      <Paper style={{ padding: 20, maxWidth: 400, margin: "20px auto" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h6">Cadastro</Typography>
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
            value="Jurídica"
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

export default Cadastro;

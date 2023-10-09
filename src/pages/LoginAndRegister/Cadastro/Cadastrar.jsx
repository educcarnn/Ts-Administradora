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
import Convite from "./components/convite";
import EmpresaInfo from "./components/empresa";

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
  return (
    <div>
      <DashboarDiv>Ts Administradora - Empresa</DashboarDiv>
      <Sidebar />
      <img src={wallpaper} alt="Plano de Fundo" style={backgroundStyle} />
      <Convite />
      <EmpresaInfo/>
    </div>
  );
}

export default Cadastro;

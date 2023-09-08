import Sidebar from "../../../components/DashboardComponents/Sidebar";
import { DashboarDiv } from "../../Dashboard/style";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SidebarUser from "../Sidebar/sidebarUser";
import EstatisticasUser from "./components/EstasticasUser/Estatisticas";

export default function DashboardUser() {
  return (
    <div className="dashboardContainer">
      <DashboarDiv>
        <h1 className="resetH1">Ts Administradora - Usuário </h1>
      </DashboarDiv>
      <div className="contentWrapper">
        <SidebarUser />
        <EstatisticasUser />
      </div>
    </div>
  );
}

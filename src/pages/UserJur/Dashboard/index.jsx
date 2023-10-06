import Sidebar from "../../../components/DashboardComponents/Sidebar";
import { DashboarDiv } from "../../Dashboard/style";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SidebarUserJuridica from "../Sidebar/sidebarUserJur";
import EstatisticasUserJur from "./components/EstasticasUserJur";

export default function DashboardUserJur() {
  return (
    <div className="dashboardContainer">
      <DashboarDiv>
        <h1 className="resetH1">Ts Administradora - Usuário Jurídica </h1>
      </DashboarDiv>
      <div className="contentWrapper">
        <SidebarUserJuridica />
        <EstatisticasUserJur />
      </div>
    </div>
  );
}

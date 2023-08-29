import Sidebar from "../../components/DashboardComponents/Sidebar";
import { DashboarDiv } from "./style";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Estatisticas from "../../components/DashboardComponents/SubComponents/Estatisticas";

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      <DashboarDiv>
        <h1 className="resetH1">Ts Administradora</h1>
      </DashboarDiv>
      <div className="contentWrapper">
        <Sidebar />
        <Estatisticas />
      </div>
    </div>
  );
}

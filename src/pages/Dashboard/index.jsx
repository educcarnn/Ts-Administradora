import Sidebar from "../../components/DashboardComponents/Sidebar";
import { DashboarDiv } from "./style";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <div>
      <DashboarDiv>
        <h1 className="resetH1">Ts Administradora</h1>
      </DashboarDiv>
      
      <Sidebar />
     
    </div>
  );
}

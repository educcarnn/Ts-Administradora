import Sidebar from "../../components/DashboardComponents/Sidebar";
import { DashboarDiv } from "./style";

export default function Dashboard() {
  return (
    <div>
      <DashboarDiv>
        <h1 className="resetH1">Ts Administrativo - Controle Interno</h1>
      </DashboarDiv>
      <Sidebar />
    </div>
  );
}

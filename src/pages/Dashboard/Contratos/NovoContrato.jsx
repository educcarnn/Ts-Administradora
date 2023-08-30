import { DashboarDiv } from "../style"
import MultiStepForm from "./MultiStepForm"
import styled from "styled-components"
import Sidebar from "../../../components/DashboardComponents/Sidebar"
import backgroundContratos from "../../../assets/Videos/contratos.jpg"; // ajuste o caminho conforme necessário


const ContainerElements = styled.div`
   background-color: white;
   background-image: url(${backgroundContratos});
   background-size: cover; 
   background-repeat: no-repeat;
   background-position: center center;
   width: 100%;
   height: 100vh;
`;


export default function NovoContrato(){
    return(
        <div>
            <DashboarDiv>TS Administradora - Novo Contrato</DashboarDiv>
            <Sidebar/>
            <ContainerElements>
                <MultiStepForm/>
            </ContainerElements>
        </div>
    )
}
import { DashboarDiv } from "../style"
import MultiStepForm from "./MultiStepForm"
import styled from "styled-components"
import Sidebar from "../../../components/DashboardComponents/Sidebar"
const Container = styled.div`
    width: 50%;

`

export default function NovoContrato(){
    return(
        <div>
            <DashboarDiv>TS Administradora - Novo Contrato</DashboarDiv>
            <Sidebar/>
            <div>
                <MultiStepForm/>
            </div>
        </div>
    )
}
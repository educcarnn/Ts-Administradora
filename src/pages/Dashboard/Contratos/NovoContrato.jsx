import { DashboarDiv } from "../style"
import MultiStepForm from "./MultiStepForm"
import styled from "styled-components"

const Container = styled.div`
    width: 50%;

`

export default function NovoContrato(){
    return(
        <div>
            <DashboarDiv>TS Administradora - Novo Contrato</DashboarDiv>
            <div>
                <MultiStepForm/>
            </div>
        </div>
    )
}
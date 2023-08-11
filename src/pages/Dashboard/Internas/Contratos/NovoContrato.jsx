import { DashboarDiv } from "../../style"
import MultiStepForm from "./MultiStepForm"

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
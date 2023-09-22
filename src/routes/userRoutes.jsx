import { Switch } from "react-router-dom";

import { MultiStepProvider } from "../context/MultiStepProvider";

import DashboardUser from "../pages/User/Dashboard";
import { FormularioProvider } from "../context/CadastroProvider";
import PropertyFormUser from "../pages/User/Imoveis/propertyFormUser";
import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios
import ListaImoveisUser from "../pages/User/Imoveis/propertyListViewUser";
import ProtectedRouteUser from "../utils/protectRoutUser_security";
import ImovelCaracteristicasUser from "../pages/User/Imoveis/ID/imovelId"; 

export const userRoutes = () => {
  return (
    <ModalProvider>
      <MultiStepProvider>
        <FormularioProvider>
     
            <Switch>
              <ProtectedRouteUser exact path="/user/dashboard" component={DashboardUser} />
              <ProtectedRouteUser exact path="/user/imovel-cadastro" component={PropertyFormUser} />
              <ProtectedRouteUser exact path="/user/imoveis-cadastrados" component={ListaImoveisUser} />
             <ProtectedRouteUser exact path="/user/imovel/:id" component={ImovelCaracteristicasUser} />
            
            </Switch>
    
        </FormularioProvider>
      </MultiStepProvider>
    </ModalProvider>
  );
};
import { Switch } from "react-router-dom";

import { MultiStepProvider } from "../context/MultiStepProvider";

import { FormularioProvider } from "../context/CadastroProvider";

import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios

import ProtectedRouteUser from "../utils/protectRoutUser_security";

import DashboardUserJur from "../pages/UserJur/Dashboard";
import ImovelCaracteristicasUserJur from "../pages/UserJur/Imoveis/ID/imovelIdJur";

import PropertyFormUserJur from "../pages/UserJur/Imoveis/propertyFormUserJur";
import ListaImoveisUserJur from "../pages/UserJur/Imoveis/propertyListViewUserJur";

export const userJurRoutes = () => {
  return (
    <ModalProvider>
      <MultiStepProvider>
        <FormularioProvider>
          <Switch>
            <ProtectedRouteUser
              exact
              path="/userjur/dashboard"
              component={DashboardUserJur}
            />
            <ProtectedRouteUser
              exact
              path="/userjur/imovel-cadastro"
              component={PropertyFormUserJur}
            />
            <ProtectedRouteUser
              exact
              path="/userjur/imoveis-cadastrados"
              component={ListaImoveisUserJur}
            />
            <ProtectedRouteUser
              exact
              path="/userjur/imovel/:id"
              component={ImovelCaracteristicasUserJur}
            />
          </Switch>
        </FormularioProvider>
      </MultiStepProvider>
    </ModalProvider>
  );
};

import { Switch, BrowserRouter, Route } from "react-router-dom";

import PessoaFisica from "../pages/Dashboard/Cadastro/Pessoa/PessoaFisica";
import PessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica/PessoaJuridica";

import { MultiStepProvider } from "../context/MultiStepProvider";
import { NegociacaoProvider } from "../context/NegociationProvider";

import ListaPessoaFisica from "../pages/Dashboard/Cadastro/Pessoa/ListaPessoaFisica";
import ListaPessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica/ListaPessoaJuridica";
import { FormularioProvider } from "../context/CadastroProvider";

import LoginAndRegister from "../pages/LoginAndRegister";

import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios

import InviteAdmin from "../pages/LoginAndRegister/Cadastro/InviteAdmin";

import { AdminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
export const Routes = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <MultiStepProvider>
          <FormularioProvider>
            <NegociacaoProvider>
              <Switch>
                <Route exact path="/" component={LoginAndRegister} />
                <Route path="/admin" component={AdminRoutes} />
                <Route path="/user" component={userRoutes}/>
                
                <Route exact path="/clientes-pessoa-fisica">
                  <PessoaFisica />
                </Route>
                <Route exact path="/clientes-pessoa-juridica">
                  <PessoaJuridica />
                </Route>
                <Route exact path="/clientes">
                  <ListaPessoaFisica />
                </Route>
                <Route exact path="/lista-pessoa-juridica">
                  <ListaPessoaJuridica />
                </Route>

                <Route exact path="/invite-admin">
                  <InviteAdmin />
                </Route>
              </Switch>
            </NegociacaoProvider>
          </FormularioProvider>
        </MultiStepProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

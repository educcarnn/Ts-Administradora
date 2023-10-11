import { Switch, BrowserRouter, Route } from "react-router-dom";

import PessoaFisica from "../pages/Dashboard/Cadastro/Pessoa/PessoaFisica";
import PessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica/PessoaJuridica";

import { MultiStepProvider } from "../context/MultiStepProvider";

import ListaPessoaFisica from "../pages/Dashboard/Cadastro/Pessoa/ListaPessoaFisica";
import ListaPessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica/ListaPessoaJuridica";
import { FormularioProvider } from "../context/CadastroProvider";

import LoginAndRegister from "../pages/LoginAndRegister";

import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios
import CreateBusiness from "../pages/LoginAndRegister/Cadastro/CreateBusiness";
import InviteAdmin from "../pages/LoginAndRegister/Cadastro/InviteAdmin";
import Home from "../pages/Home";
import { AdminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import { userJurRoutes } from "./userjurRoutes";

export const Routes = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <MultiStepProvider>
          <FormularioProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginAndRegister} />
              <Route path="/admin" component={AdminRoutes} />
              <Route path="/user" component={userRoutes} />
              <Route path="/userjur" component={userJurRoutes} />
              
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
              <Route exact path="/cadastrar/empresa">
                <CreateBusiness />
              </Route>

              <Route exact path="/invite-admin">
                <InviteAdmin />
              </Route>
            </Switch>
          </FormularioProvider>
        </MultiStepProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

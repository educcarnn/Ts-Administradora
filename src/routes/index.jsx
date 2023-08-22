import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProperties from "../pages/AddProperties";
import PessoaFisica from "../pages/Dashboard/Cadastro/PessoaFisica";
import PessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica";
import PropertyForm from "../pages/Dashboard/Imoveis/PropertyForm";
import NovoContrato from "../pages/Dashboard/Contratos/NovoContrato";
import { MultiStepProvider } from "../context/MultiStepProvider";
import { NegociacaoProvider } from "../context/NegociationProvider";
import CadastroLista from "../components/Form/CadastroLista";
import ListaPessoaFisica from "../pages/Dashboard/Cadastro/ListaPessoaFisica";
import ListaPessoaJuridica from "../pages/Dashboard/Cadastro/ListaPessoaJuridica";
import { FormularioProvider } from "../context/CadastroProvider";
import PropertyListView from "../pages/Dashboard/Imoveis/ListaImoveis";
import UsuarioInfo from "../pages/Dashboard/Cadastro/UsuarioInfo/UsuarioInfo";
import LoginAndRegister from "../pages/LoginAndRegister";
import ImovelCaracteristicas from "../pages/Dashboard/Imoveis/ID/ImovelId";
import PersonsInfo from "../pages/Dashboard/Cadastro/PersonsInfo";
import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios

export const Routes = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <MultiStepProvider>
          <FormularioProvider>
            <NegociacaoProvider>
              <Switch>
                <Route exact path="/">
                  <LoginAndRegister />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/imoveis">
                  <PropertyForm />
                </Route>
                <Route exact path="/cadastro">
                  <AddProperties />
                </Route>
                <Route exact path="/imoveis-cadastrados">
                  <PropertyListView />
                </Route>
                <Route exact path="/cadastro-lista">
                  <CadastroLista />
                </Route>
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
                <Route exact path="/novo-contrato">
                  <NovoContrato />
                </Route>
                <Route exact path="/clientes">
                  <PersonsInfo />
                </Route>

                {/*LISTAGEM */}

                {/*ROTAS ID */}
                <Route path="/obter-usuario/:id">
                  <UsuarioInfo />
                </Route>

                {/*INFORMAÇÕES IMOVEL*/}



                <Route path="/imovel/:id">
                  <ImovelCaracteristicas />
                </Route>
              </Switch>
            </NegociacaoProvider>
          </FormularioProvider>
        </MultiStepProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

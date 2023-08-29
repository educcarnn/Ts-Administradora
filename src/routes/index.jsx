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
import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios
import ListaContrato from "../pages/Dashboard/Contratos/ContratoInfo";
import ContractEdit from "../pages/Dashboard/Contratos/Info/ContratoId";
import Cadastro from "../pages/LoginAndRegister/Cadastro/Cadastrar";
import Fiador from "../pages/Pessoas/Fiador";
import Inquilino from "../pages/Pessoas/Inquilino";
import Proprietario from "../pages/Pessoas/Proprietario";
import InviteAdmin from "../pages/LoginAndRegister/Cadastro/InviteAdmin";

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

                <Route exact path="/cadastrar-admin">
                  <Cadastro/>
                </Route>
                {/*LISTAGEM */}
                    <Route exact path="/fiador">
                      <Fiador/>
                    </Route>
                    <Route exact path="/inquilino">
                      <Inquilino/>
                    </Route>
                    <Route exact path="/proprietario">
                      <Proprietario/>
                    </Route>

                    {/*Cadastro*/}

                    <Route exact path="/invite-admin">
                      <InviteAdmin/>
                    </Route>

                    <Route exact path="/fiador">
                      <Fiador/>
                    </Route>
                {/*ROTAS ID */}

                <Route path="/obter-usuario/:id">
                  <UsuarioInfo />
                </Route>
                {/*CONTRATO*/}
                <Route path="/obter-contratos">
                  <ListaContrato />
                </Route>
                <Route path="/obter-contrato-novo/:id">
                  <ContractEdit />
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

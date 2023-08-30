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
import ProtectedRoute from "../utils/protectRout_security";

export const AdminRoutes = () => {
  return (
    <ModalProvider>
      <MultiStepProvider>
        <FormularioProvider>
          <NegociacaoProvider>
            <Switch>
              <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
              <Route exact path="/admin/imoveis" component={PropertyForm} />
              <Route exact path="/admin/cadastro" component={AddProperties} />
              <ProtectedRoute exact path="/admin/imoveis-cadastrados" component={PropertyListView} />
              <Route exact path="/admin/cadastro-lista" component={CadastroLista} />
              <Route exact path="admin/novo-contrato" component={NovoContrato}/>
              <Route exact path="admin/cadastrar-admin" component={Cadastro}/>
            </Switch>
          </NegociacaoProvider>
        </FormularioProvider>
      </MultiStepProvider>
    </ModalProvider>
  );
};
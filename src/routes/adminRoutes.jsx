import { Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import PropertyForm from "../pages/Dashboard/Imoveis/PropertyForm";
import NovoContrato from "../pages/Dashboard/Contratos/NovoContrato";
import { MultiStepProvider } from "../context/MultiStepProvider";

import CadastroLista from "../components/Form/CadastroLista";
import { FormularioProvider } from "../context/CadastroProvider";
import PropertyListView from "../pages/Dashboard/Imoveis/ListaImoveis";
import UsuarioInfo from "../pages/Dashboard/Cadastro/UsuarioInfo/UsuarioInfo";
import ImovelCaracteristicas from "../pages/Dashboard/Imoveis/ID/ImovelId";
import { ModalProvider } from "../context/ModalContext"; // Ajuste o caminho de acordo com sua estrutura de diretórios
import ListaContrato from "../pages/Dashboard/Contratos/ContratoInfo";
import ContractEdit from "../pages/Dashboard/Contratos/Info/ContratoId";
import Cadastro from "../pages/LoginAndRegister/Cadastro/Cadastrar";
import Fiador from "../pages/Pessoas/Fiador";
import Inquilino from "../pages/Pessoas/Inquilino";
import Proprietario from "../pages/Pessoas/Proprietario";
import ProtectedRoute from "../utils/protectRout_security";
import ListaPessoaFísica from "../pages/Dashboard/Cadastro/Pessoa/ListaPessoaFisica";
import ListaPessoaJuridica from "../pages/Dashboard/Cadastro/PessoaJuridica/ListaPessoaJuridica";
import ProprietarioJuridica from "../pages/PessoasJuridicas/proprietario";
import InquilinoJuridica from "../pages/PessoasJuridicas/inquilino";
import UsuarioInfoJuridica from "../pages/Dashboard/Cadastro/UsuarioInfoJuridica/UsuarioInfo";

export const AdminRoutes = () => {
  return (
    <ModalProvider>
      <MultiStepProvider>
        <FormularioProvider>
            <Switch>
              <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/admin/imoveis" component={PropertyForm} />
              <ProtectedRoute exact path="/admin/imoveis-cadastrados" component={PropertyListView} />
              <ProtectedRoute exact path="/admin/cadastro-lista" component={CadastroLista} />
              <ProtectedRoute exact path="/admin/novo-contrato" component={NovoContrato}/>
              <ProtectedRoute exact path="/admin/cadastrar-admin" component={Cadastro}/>
                {/*CONTRATO*/}
              <ProtectedRoute path="/admin/obter-contratos" component={ListaContrato}/>
                 {/*ROTAS ID */}
              <ProtectedRoute path="/admin/obter-usuario/:id" component={UsuarioInfo}/>
              <ProtectedRoute path="/admin/obter-usuario-juridica/:id" component={UsuarioInfoJuridica}/>
              <ProtectedRoute path="/admin/obter-contrato-novo/:id" component={ContractEdit}/>
              <ProtectedRoute path="/admin/imovel/:id" component={ImovelCaracteristicas}/>
                {/*LISTAGEM*/}
                <ProtectedRoute path="/admin/cliente-fisica" component={ListaPessoaFísica}/>
                <ProtectedRoute path="/admin/cliente-juridica" component={ListaPessoaJuridica}/>
                <ProtectedRoute path="/admin/fiador" component={Fiador}/>
                <ProtectedRoute path="/admin/inquilino" component={Inquilino}/>
                <ProtectedRoute path="/admin/proprietario" component={Proprietario}/>

                <ProtectedRoute path="/admin/inquilino-juridica" component={InquilinoJuridica}/>
                <ProtectedRoute path="/admin/proprietario-juridica" component={ProprietarioJuridica}/>
            </Switch>
   
        </FormularioProvider>
      </MultiStepProvider>
    </ModalProvider>
  );
};
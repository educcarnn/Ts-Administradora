import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProperties from "../pages/AddProperties";
import Cadastro from "../pages/Dashboard/Internas/Cadastro";
import PessoaJuridica from "../pages/Dashboard/Internas/Cadastro/PessoaJuridica";
import PropertyForm from "../pages/Dashboard/Internas/Imóveis/PropertyForm";
import { SidebarProvider } from "../context/SidebarContext";

export const Routes = () => {
  return (
    <BrowserRouter>
     <SidebarProvider/>
      <Switch>
      
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/imoveis"> 
          <PropertyForm />
        </Route>
        <Route exact path="/cadastro">
          <AddProperties />
        </Route>
        <Route exact path="/clientes-pessoa-fisica">
          <Cadastro />
        </Route>
        <Route exact path="/clientes-pessoa-juridica">
          <PessoaJuridica />
        </Route>
      </Switch>
      <SidebarProvider/>
    </BrowserRouter>
  );
};

import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddProperties from "../pages/AddProperties";
import Cadastro from "../pages/Dashboard/Internas/Cadastro";
import PessoaJuridica from "../pages/Dashboard/Internas/PessoaJuridica";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AddProperties />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/clientes-pessoa-fisica">
          <Cadastro />
        </Route>
        <Route exact path="/clientes-pessoa-juridica">
          <PessoaJuridica />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

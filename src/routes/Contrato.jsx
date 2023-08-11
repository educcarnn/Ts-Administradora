import { Switch, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export const ContratosRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/novo-contrato">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

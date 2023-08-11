import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  );
}

export default AuthRoutes;
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useJwt } from 'react-jwt';

const ProtectedRoute = ({
  component: Component,
  adminOnly = false,
  ...rest
}) => {

  const token = localStorage.getItem("token");

 
  const { decodedToken, isExpired } = useJwt(token || '');

  if (!token || isExpired) return <Redirect to="/" />;
  
  const userIsAdmin = decodedToken && decodedToken.role === "admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        (!adminOnly || (adminOnly && userIsAdmin)) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;

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
  
  const userRole = decodedToken?.role;
  const userIsAdmin = userRole === "admin";
  const userIsUser = userRole === "user";

  return (
    <Route
      {...rest}
      render={(props) =>
        userIsUser ? (
          <Redirect to="/" />
        ) : (!adminOnly || (adminOnly && userIsAdmin)) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;

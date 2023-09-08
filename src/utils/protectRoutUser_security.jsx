import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useJwt } from 'react-jwt';

const ProtectedRouteUser = ({
  component: Component,
  adminOnly = false,
  ...rest
}) => {

  const token = localStorage.getItem("token");

 
  const { decodedToken, isExpired } = useJwt(token || '');

  if (!token || isExpired) return <Redirect to="/" />;
  
  const userIsUser = decodedToken && decodedToken.role === "user";

  return (
    <Route
      {...rest}
      render={(props) =>
        (!adminOnly || (adminOnly && userIsUser)) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRouteUser;

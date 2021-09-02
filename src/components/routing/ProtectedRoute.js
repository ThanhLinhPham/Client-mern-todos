import { AuthContext } from "../../contexts/AuthContexts";
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router-dom";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

import Layout from "./app/layout";
import routes from "./routes.config";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserAuthForm } from "./app/auth/layout";
import React from "react";
import AuthContext from "./context/auth";

export default function Router() {
  const { auth } = React.useContext(AuthContext);
  const { isAuth } = auth;
  const defaultRoute = routes[0];

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuth ? (
            <Layout>
              <Navigate to={defaultRoute.id} />
            </Layout>
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
      {routes.map((route) => (
        <Route
          key={route.id}
          path={route.id}
          element={
            isAuth ? (
              <Layout>
                <route.component />
              </Layout>
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
      ))}
      <Route
        path="/auth/:type"
        element={
          isAuth ? (
            <Layout>
              <Navigate to="/" />
            </Layout>
          ) : (
            <UserAuthForm />
          )
        }
      />
    </Routes>
  );
}

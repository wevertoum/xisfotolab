import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CadastroProvider } from "contexts/CadastroContext";
import { UserProvider } from "contexts/UserContext";
import PedidoPage from "pages/XisMainModule/PedidoPage";
import LoginPage from "pages/XisMainModule/LoginPage";
import PrivateRoute from "HOCs/PrivateRoute";

const AdminPage = React.lazy(() => import("../pages/XisMainModule/AdminPage"));

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="pedido" />

        <Route path="/pedido">
          <CadastroProvider>
            <PedidoPage />
          </CadastroProvider>
        </Route>

        <UserProvider>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute lazy path="/admin" component={AdminPage} />
        </UserProvider>
      </Switch>
    </Router>
  );
};

export default MainRouter;

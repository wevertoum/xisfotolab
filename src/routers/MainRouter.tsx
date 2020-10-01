import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CadastroProvider } from "contexts/CadastroContext";
import PedidoPage from "pages/XisMainModule/PedidoPage";
import LoginPage from "pages/XisMainModule/LoginPage";
import PrivateRoute from "HOCs/PrivateRoute";
import NotFoundPage from "pages/NotFoundPage";
import AvaliacaoPage from "pages/XisMainModule/AvaliacaoPage";

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

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/avaliacao">
          <AvaliacaoPage />
        </Route>
        <PrivateRoute lazy path="/admin" component={AdminPage} />

        <Route path="/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default memo(MainRouter);

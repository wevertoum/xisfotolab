import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "../pages/XisMainModule/MainPage";
import LoginPage from "../pages/XisMainModule/LoginPage";
import { CadastroProvider } from "contexts/CadastroContext";

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <CadastroProvider>
            <MainPage />
          </CadastroProvider>
        </Route>

        <Redirect exact from="/" to="home" />

        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "../pages/XisMainModule/MainPage";
import AnotherPage from "../pages/XisMainModule/AnotherPage";

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <MainPage />
        </Route>

        <Redirect exact from="/" to="home" />

        <Route path="/anotherPage">
          <AnotherPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;

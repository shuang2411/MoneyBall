import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login.js"

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/dashboard">
        <Register />
      </Route>
      <Route exact path="/">
        <Register />
      </Route>
      <Route path="*">
        <Login />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
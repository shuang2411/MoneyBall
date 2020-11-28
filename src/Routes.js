import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from "./Pages/Register/Register";

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <Register />
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
        <Register />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
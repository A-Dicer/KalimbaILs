import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Main from "./pages/Main";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

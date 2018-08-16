import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Test from "./pages/Test";
import Races from "./pages/Races";
import LeaderBoard from "./pages/LeaderBoard";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/races/:id" component={Races} />
        <Route exact path="/user/:id" component={LeaderBoard} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;

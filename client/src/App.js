import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Navbar from "../src/components/layout/NavBar";
import Landing from "../src/components/layout/Landing";
import Admin from "./components/auth/Admin";
import Login from "./components/auth/Login";

// redux
import { Provider } from "react-redux";
import store from "./store";

import Alert from "./components/layout/Alert";
import Feature from "./components/feature/Feature";
import UpdateFeature from "./components/feature/UpdateFeature";
import CreateFeature from "./components/feature/CreateFeature";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert></Alert>
          <Switch>
            <Route exact path="/Admin" component={Admin} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Feature" component={Feature} />
            <Route exact path="/Feature/:id" component={UpdateFeature} />
            <Route exact path="/CreateFeature" component={CreateFeature} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;

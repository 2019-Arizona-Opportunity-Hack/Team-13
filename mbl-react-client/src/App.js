import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestionResponse from "./components/Questions/QuestionResponse";
// import Response from "./components/Responses/Response";
import { Provider } from "react-redux";
import ReactGA from "react-ga";
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./secureUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecureRoute from "./secureUtils/SecuredRoute";
import ApplicationStatus from "./components/Applications/ApplicationStatus";
import USForm from "./components/USForms/USForm";
// import USForm0001 from "./components/USForms/USForm0001";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

ReactGA.initialize("UA-10207332-26", {
  debug: true
});

ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <SecureRoute
                exact
                path="/application-status"
                component={ApplicationStatus}
              />
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute
                exact
                path="/question/questionSequence"
                component={QuestionResponse}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

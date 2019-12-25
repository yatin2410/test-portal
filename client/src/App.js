import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import My404Component from "./components/layout/My404Component";
import Loading from "./components/layout/Loading";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import PrivateRoute from "./components/private-route/user-privateRoute";
import PrivateRouteAdmin from "./components/private-route/admin-privateRoute";
import NoUserPrivateRoute from "./components/private-route/nouser-privateRoute";
import adminDashboard from "./components/admin-dashboard/Dashboard/dashboard";
import userDashboard from "./components/user-dashboard/UserDashboard/Dashboard";
import TakeQuiz from "./components/take-quiz/TakeQuiz/takequiz";
import ViewQuiz from "./components/view-quiz/ViewQuiz/viewquiz";
import ViewQuizAdmin from "./components/view-quiz/ViewQuiz/viewquizAdmin";
import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("storage", e => {
      if (e.key === "jwtToken" && e.oldValue && !e.newValue) {
        store.dispatch(logoutUser());
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route
              exact
              path="/changePassword/:id"
              component={ChangePassword}
            />
            <Switch>
              <PrivateRouteAdmin path="/dashboard" component={adminDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute path="/dashboard" component={userDashboard} />
            </Switch>
            <Switch>
              <NoUserPrivateRoute path="/dashboard" component={Landing} />
            </Switch>
            <Switch>
              <PrivateRoute path="/takequiz/:id" component={TakeQuiz} />
            </Switch>
            <Switch>
              <NoUserPrivateRoute path="/takequiz/:id" component={Landing} />
            </Switch>
            <Switch>
              <PrivateRoute path="/viewquiz/:id" component={ViewQuiz} />
            </Switch>
            <Switch>
              <NoUserPrivateRoute path="/viewquiz/:id" component={Landing} />
            </Switch>
            <Switch>
              <PrivateRouteAdmin
                path="/viewquizadmin/:id1/:id2"
                component={ViewQuizAdmin}
              />
            </Switch>
            <Switch>
              <NoUserPrivateRoute
                path="/viewquizadmin/:id1/:id2"
                component={Landing}
              />
            </Switch>
            <Route path="/404" component={My404Component} />
            <Redirect from="*" to="/404" />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

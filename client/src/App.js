import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/user-privateRoute";
import PrivateRouteAdmin from "./components/private-route/admin-privateRoute";
import NoUserPrivateRoute from "./components/private-route/nouser-privateRoute";
import adminDashboard from "./components/admin-dashboard/Dashboard/dashboard";
import userDashboard from "./components/user-dashboard/Dashboard";


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
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRouteAdmin path="/dashboard" component={adminDashboard} />
            </Switch>
            <Switch>
              <PrivateRoute path="/dashboard" component={userDashboard} />
            </Switch>
            <Switch>
              <NoUserPrivateRoute path="/dashboard" component={Landing} />
            </Switch>
           
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

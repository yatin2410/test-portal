import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NoUserPrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      if(auth.isAuthenticated === undefined || auth.isAuthenticated===false){
        return <Redirect to="/" />
      } 
      return null;
    }
    }
  />
);

NoUserPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NoUserPrivateRoute);

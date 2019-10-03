import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRouteAdmin = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>{
      if(auth.isAuthenticated === true && auth.user.IsAdmin===true){
        return <Component {...props}/>
      }else
      return null;      
    }
    }
  />
);

PrivateRouteAdmin.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouteAdmin);

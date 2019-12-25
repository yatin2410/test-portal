import React, { Component } from "react";
import { Link } from "react-router-dom";
import daLogo from "../../images/da-logo.png";
import Navbar from "../layout/Navbar";

class My404Component extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row justify-content-md-center mt-4">
            <div className="col-md-auto">
              <h1 style={{ fontSize: "10em" }}>404</h1>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-md-auto">
              <h4>
                We are sorry, but the page you are looking for does not exist.
              </h4>
            </div>
          </div>
          <div className="row justify-content-md-center mt-4">
            <div className="col-3">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-lg modi-btn">
                Register
              </Link>
            </div>
            <div className="col-3">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-lg float-right">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

My404Component.propTypes = {};

export default My404Component;

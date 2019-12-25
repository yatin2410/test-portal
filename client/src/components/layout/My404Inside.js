import React, { Component } from "react";
import { Link } from "react-router-dom";

class My404Component extends Component {
  render() {
    return (
      <div>
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
        </div>
      </div>
    );
  }
}

My404Component.propTypes = {};

export default My404Component;

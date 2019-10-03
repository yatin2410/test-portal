import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                textDecoration: "none"
              }}
            >
              <span style={{fontFamily:"oxygen",fontSize:"3em"}}>TEST-PORTAL</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

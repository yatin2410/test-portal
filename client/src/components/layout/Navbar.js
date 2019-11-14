import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                textDecoration: "none"
              }}
            >
              <span style={{fontFamily:"oxygen",fontSize:"3em", color:"rgb(57, 70, 78)"}}>TEST-PORTAL</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;

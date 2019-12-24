import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg nav-color">
      <div className="container-fluid">
        <div className="mr-5">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn"
            onClick={props.toggelSidebar}>
            <i className="material-icons">menu</i>
          </button>
        </div>
        <div className="ml-5">
          <span
            style={{
              fontSize: "2em",
              fontFamily: "oxygen",
              textAlign: "center"
            }}>
            TEST-PORTAL
          </span>
        </div>
        <div>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard/home"
                onClick={() => {
                  props.changeUserLocation("home");
                }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard/results"
                onClick={() => {
                  props.changeUserLocation("results");
                }}>
                Results
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard/quiz"
                onClick={() => {
                  props.changeUserLocation("quiz");
                }}>
                Quiz
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={props.onLogoutClick} to="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

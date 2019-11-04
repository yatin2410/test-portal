import React from 'react';
import {  Link } from "react-router-dom";


export default function NavBar(props) {
    return (
      <nav className="navbar navbar-expand-lg navbar-secondary bg-light">
        <div className="container-fluid">
          <div className="col-3">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-primary "
              onClick={props.toggelSidebar}>
              <i className="material-icons">menu</i>
            </button>
          </div>
          <div className="col-4">
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
                <Link className="nav-link" to="/dashboard/home"
                  onClick={()=>{props.changeUserLocation("home")}}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/results"
                  onClick ={()=>{props.changeUserLocation("results")}}
                >
                  Results
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
  
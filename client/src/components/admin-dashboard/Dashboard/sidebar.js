import React from 'react'
import classNames from "classnames";
import {  Link } from "react-router-dom";

function SideBarButton(props) {
    return (
      <Link to={"/dashboard/" + props.link}  style={{ textDecoration: "None" }}>
        <button
          onClick={() => {
            props.changeUserLocation(props.link);
          }}
          type="button"
          className={classNames(
            "list-group-item list-group-item-action menu-regular",
            { "menu-active": props.userLocation === props.link }
          )}>
          {props.children}
        </button>
      </Link>
    );
  }
  
  export default  function SideBar(props) {
    return (
      <nav id="sidebar" ref={props.sidebar}>
        <div className="container mt-4">
          <span style={{ fontFamily: "oxygen", fontSize: "2em" }}>
            TEST-PORTAL
          </span>
        </div>
        <hr />
        <div className="list-group">
          <SideBarButton
            link="home"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Home
          </SideBarButton>
          <SideBarButton
            link="results"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Results
          </SideBarButton>
          <SideBarButton
            link="users"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Users
          </SideBarButton>
          <SideBarButton
            link="quiz"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Quiz
          </SideBarButton>
          <SideBarButton
            link="qbank"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Question Bank
          </SideBarButton>
          <SideBarButton
            link="myaccount"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            My Account
          </SideBarButton>
          <SideBarButton
            link="settings"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Settings
          </SideBarButton>
          <SideBarButton
            link="help"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Help
          </SideBarButton>
          <Link to="/dashboard/logout" style={{ textDecoration: "None" }}>
            <button
              type="button"
              className="list-group-item list-group-item-action menu-regular"
              onClick={props.onLogoutClick}>
              Logout
            </button>
          </Link>
        </div>
      </nav>
    );
  }
  

import React,{Component} from 'react'
import classNames from "classnames";
import {  Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


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
  

class Sidebar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let props = this.props;
    return (
      <nav id="sidebar"  ref={props.sidebar}>
        <div className="container mt-4" >
          <span style={{ fontFamily: "oxygen", fontSize: "2em" }}>
            TEST-PORTAL
          </span>
          <hr/>
          <span style={{fontSize:"1.25em"}} className="ml-5">
            ID: {this.props.auth.user.Id}
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
            link="quiz"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            Quiz
          </SideBarButton>
          <SideBarButton
            link="myaccount"
            userLocation = {props.userLocation}
            changeUserLocation={props.changeUserLocation}>
            My Account
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
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(Sidebar);
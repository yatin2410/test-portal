import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import Home from "../Home/home";
import Myaccount from "../Myaccount/myaccount";
import Quiz from "../Quiz/quiz";
import Results from "../Results/results";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import Help from "../Help/help";
import { Help1 } from "../Help/help";
import { Help2 } from "../Help/help";
import { Help3 } from "../Help/help";
import { Help4 } from "../Help/help";
import SuccessAlert from "../../layout/Flash";
import InternetCheck from "../../layout/InternetCheck";
class userDashboard extends Component {
  constructor(props) {
    super(props);
    this.toggelSidebar = this.toggelSidebar.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.changeUserLocation = this.changeUserLocation.bind(this);
    this.sidebar = React.createRef();
    this.state = {
      sidebar: true,
      userLocation: "home"
    };
  }

  componentDidMount() {
    let path = this.props.location.pathname.substring(
      this.props.location.pathname.lastIndexOf("/") + 1
    );
    if (path === "dashboard" || path === "") path = "home";
    this.setState({ userLocation: path });
    let item = localStorage.getItem("sidebar");
    this.setState({ sidebar: item === "true" }, () => {
      if (this.state.sidebar === false)
        this.sidebar.current.className += "active";
      else this.sidebar.current.className = "";
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  changeUserLocation(ele) {
    if (this.state.userLocation === ele) {
      return;
    }
    this.setState({ userLocation: ele });
  }

  toggelSidebar() {
    if (this.state.sidebar === true) this.sidebar.current.className += "active";
    else this.sidebar.current.className = "";
    let val = this.state.sidebar;
    localStorage.setItem("sidebar", !val);
    this.setState({ sidebar: !val });
  }

  render() {
    // const { user } = this.props.auth;
    return (
      <div className="wrapper">
        <SideBar
          sidebar={this.sidebar}
          onLogoutClick={this.onLogoutClick}
          changeUserLocation={this.changeUserLocation}
          userLocation={this.state.userLocation}
        />
        <div id="content">
          <NavBar
            changeUserLocation={this.changeUserLocation}
            toggelSidebar={this.toggelSidebar}
            onLogoutClick={this.onLogoutClick}
          />
          <div className="main-container">
            <SuccessAlert />
            <InternetCheck />
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/dashboard/home" component={Home} />
            <Route exact path="/dashboard/results" component={Results} />
            <Route exact path="/dashboard/quiz" component={Quiz} />
            <Route exact path="/dashboard/myaccount" component={Myaccount} />
            <Route exact path="/dashboard/help" component={Help} />
            <Route exact path="/dashboard/help1" component={Help1} />
            <Route exact path="/dashboard/help2" component={Help2} />
            <Route exact path="/dashboard/help3" component={Help3} />
            <Route exact path="/dashboard/help4" component={Help4} />
          </div>
        </div>
      </div>
    );
  }
}

userDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(userDashboard);

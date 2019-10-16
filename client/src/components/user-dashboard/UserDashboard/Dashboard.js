import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import "./css/dashboard.css";
import Home from "../Home/home";
import Myaccount from "../Myaccount/myaccount";
import Quiz from "../Quiz/quiz";
import Results from "../Results/results";

import SideBar from './sidebar';
import NavBar from './navbar';

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
  
  componentDidMount(){
    let path = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/")+1);
    if(path==="dashboard" || path==="") path="home";
    this.setState({userLocation: path}); 
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
    console.log(this.sidebar.current);
    if (this.state.sidebar === true) this.sidebar.current.className += "active";
    else this.sidebar.current.className = "";
    let val = this.state.sidebar;
    this.setState({ sidebar: !val });
  }

  render() {
    // const { user } = this.props.auth;
    return (
      <Router>
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
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/dashboard/home" component={Home} />
            <Route exact path="/dashboard/results" component={Results} />
            <Route exact path="/dashboard/quiz" component={Quiz} />
            <Route exact path="/dashboard/myaccount" component={Myaccount} />

          </div>
        </div>
      </Router>
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(userDashboard);
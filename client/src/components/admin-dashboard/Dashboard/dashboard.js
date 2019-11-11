import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import Home from "../Home/home";
import Users from "../Users/users";
import Myaccount from "../Myaccount/myaccount";
import Qbank from "../Qbank/qbank";
import Quiz from "../Quiz/quiz";
import Results from "../Results/results";
import Settings from "../Settings/settings";
import AddQuestion from '../addQuestion/addquestion';
import AddQuiz from '../addQuiz/addquiz';
import EditQuestion from '../editQuestion/editquestion';
import AddQuestionsQuiz from '../addQuestionsQuiz/addquestionquiz';
import ShowQuizQuestions from "../Quiz/showquizquestions";
import EditQuiz from "../Quiz/editquiz";
import SideBar from './sidebar';
import NavBar from './navbar';
import Help from '../Help/help';
import {Help1} from '../Help/help';
import {Help2} from '../Help/help';
import {Help3} from '../Help/help';
import {Help4} from '../Help/help';
import {Help5} from '../Help/help';
import {Help6} from '../Help/help';
import {Help7} from '../Help/help';

class adminDashboard extends Component {
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
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/dashboard/home" component={Home} />
              <Route exact path="/dashboard/results" component={Results} />
              <Route exact path="/dashboard/users" component={Users} />
              <Route exact path="/dashboard/quiz" component={Quiz} />
              <Route exact path="/dashboard/qbank" component={Qbank} />
              <Route exact path="/dashboard/myaccount" component={Myaccount} />
              <Route exact path="/dashboard/settings" component={Settings} />
              <Route exact path='/dashboard/addquestion' component={AddQuestion} />
              <Route exact path='/dashboard/addquiz' component={AddQuiz} />
              <Route exact path='/dashboard/editquestion/:id' component={EditQuestion} />
              <Route exact path='/dashboard/addquiz/questions/:id' component={AddQuestionsQuiz} />
              <Route exact path='/dashboard/showquestions/:id' component={ShowQuizQuestions} />
              <Route exact path='/dashboard/editquiz/:id' component={EditQuiz} />
              <Route exact path="/dashboard/help" component={Help} />
              <Route exact path="/dashboard/help1" component={Help1} />
              <Route exact path="/dashboard/help2" component={Help2} />
              <Route exact path="/dashboard/help3" component={Help3} />
              <Route exact path="/dashboard/help4" component={Help4} />
              <Route exact path="/dashboard/help5" component={Help5} />
              <Route exact path="/dashboard/help6" component={Help6} />
              <Route exact path="/dashboard/help7" component={Help7} />
            </div>
          </div>
        </div>
    );
  }
}

adminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(adminDashboard);

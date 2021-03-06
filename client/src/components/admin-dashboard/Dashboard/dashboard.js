import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { fetchServerTime } from "../../../actions/fetchActions";
import Home from "../Home/home";
import Users from "../Users/users";
import Myaccount from "../Myaccount/myaccount";
import Qbank from "../Qbank/qbank";
import Quiz from "../Quiz/quiz";
import Results from "../Results/results";
import QuizUserResults from "../Results/quizUserResults";
import Settings from "../Settings/settings";
import AddQuestion from "../addQuestion/addquestion";
import AddQuiz from "../addQuiz/addquiz";
import EditQuestion from "../editQuestion/editquestion";
import AddQuestionsQuiz from "../addQuestionsQuiz/addquestionquiz";
import ShowQuizQuestions from "../Quiz/showquizquestions";
import AddQuestionsRandom from "../addQuestionsRandomly/addQuestionsRandomly";
import EditQuiz from "../Quiz/editquiz";
import UserResult from "../Results/userResult";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import SuccessAlert from "../../layout/Flash";
import InternetCheck from "../../layout/InternetCheck";
import Help from "../Help/help";
import { Help1 } from "../Help/help";
import { Help2 } from "../Help/help";
import { Help3 } from "../Help/help";
import { Help4 } from "../Help/help";
import { Help5 } from "../Help/help";
import { Help6 } from "../Help/help";
import { Help7 } from "../Help/help";
import { Help8 } from "../Help/help";
import { Help9 } from "../Help/help";
import { Help10 } from "../Help/help";
import Switch from "react-router-dom/Switch";
import My404Component from "../../layout/My404Inside";

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

  componentDidMount() {
    this.props.fetchServerTime();
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.time && nextProps.time.time) {
      console.log(nextProps.time);
      let serverTime = new Date(nextProps.time.time).getTime();
      let clientTime = new Date().getTime();
      console.log(serverTime);
      console.log(clientTime);
      if (Math.abs(serverTime - clientTime) >= 1000 * 60 * 5) {
        alert("Please correct computer's Time");
        this.props.logoutUser();
      }
    }
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
            <Switch>
              <Route exact path="/dashboard" component={Home} />
              <Route exact path="/dashboard/home" component={Home} />
              <Route exact path="/dashboard/results" component={Results} />
              <Route
                exact
                path="/dashboard/quiz/result/:id"
                component={QuizUserResults}
              />
              <Route exact path="/dashboard/users" component={Users} />
              <Route exact path="/dashboard/quiz" component={Quiz} />
              <Route exact path="/dashboard/qbank" component={Qbank} />
              <Route exact path="/dashboard/myaccount" component={Myaccount} />
              <Route exact path="/dashboard/settings" component={Settings} />
              <Route
                exact
                path="/dashboard/addquestion"
                component={AddQuestion}
              />
              <Route exact path="/dashboard/addquiz" component={AddQuiz} />
              <Route
                exact
                path="/dashboard/editquestion/:id"
                component={EditQuestion}
              />
              <Route
                exact
                path="/dashboard/addquiz/questions/:id"
                component={AddQuestionsQuiz}
              />
              <Route
                exact
                path="/dashboard/addquiz/random/:id"
                component={AddQuestionsRandom}
              />
              <Route
                exact
                path="/dashboard/showquestions/:id"
                component={ShowQuizQuestions}
              />
              <Route
                exact
                path="/dashboard/editquiz/:id"
                component={EditQuiz}
              />
              <Route
                exact
                path="/dashboard/user/result/:id"
                component={UserResult}
              />
              <Route exact path="/dashboard/help" component={Help} />
              <Route exact path="/dashboard/help1" component={Help1} />
              <Route exact path="/dashboard/help2" component={Help2} />
              <Route exact path="/dashboard/help3" component={Help3} />
              <Route exact path="/dashboard/help4" component={Help4} />
              <Route exact path="/dashboard/help5" component={Help5} />
              <Route exact path="/dashboard/help6" component={Help6} />
              <Route exact path="/dashboard/help7" component={Help7} />
              <Route exact path="/dashboard/help8" component={Help8} />
              <Route exact path="/dashboard/help9" component={Help9} />
              <Route exact path="/dashboard/help10" component={Help10} />
              <Route component={My404Component} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

adminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  fetchServerTime: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  time: state.data.serverTime
});

export default connect(mapStateToProps, { logoutUser, fetchServerTime })(
  adminDashboard
);

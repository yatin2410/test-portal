import React, { Component } from "react";
import SearchTable from "./quiztable";
import { connect } from "react-redux";
import { fetchUserQuizs, fetchUser } from "../../../actions/fetchActions";
import PropTypes from "prop-types";
import Loading from "../../layout/Loading";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuizs: [],
      upcomingQuizs: [],
      takenQuizs: [],
      isLoading: true
    };
    this.onStart = this.onStart.bind(this);
  }
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.fetchUser(user.id);
    this.props.fetchUserQuizs(user.group);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quizs && nextProps.quizs.length !== 0) {
      let quizs = nextProps.quizs.filter(
        item =>
          new Date(item.startDate).getTime() <= new Date().getTime() &&
          new Date(item.endDate).getTime() > new Date().getTime()
      );
      this.setState({ currentQuizs: quizs });
      console.log(nextProps.quizs);
      console.log(
        new Date(nextProps.quizs[0].startDate).getTime(),
        new Date().getTime()
      );
      quizs = nextProps.quizs.filter(
        item =>
          new Date(item.startDate).getTime() > new Date().getTime() &&
          new Date(item.endDate).getTime() > new Date().getTime()
      );
      this.setState({ upcomingQuizs: quizs });
      this.setState({ isLoading: false });
    }
    if (nextProps.user && nextProps.user.quizs) {
      console.log(nextProps.user.quizs);
      let arr = [];
      for (let i = 0; i < nextProps.user.quizs.length; i++) {
        arr.push(...Object.keys(nextProps.user.quizs[i]));
      }
      console.log(arr);
      this.setState({ takenQuizs: arr });
    }
  }
  onStart(id) {
    this.props.history.push("/takequiz/" + id);
  }
  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="mt-5">
              <h4 className="row justify-content-md-center">Current Quizzes</h4>
              <SearchTable
                quizs={this.state.currentQuizs}
                onStart={this.onStart}
                isCurrent={false}
                takenQuizs={this.state.takenQuizs}
              />
            </div>
            <div className="mt-5">
              <h4 className="row justify-content-md-center">
                Upcoming Quizzes
              </h4>
              <SearchTable
                quizs={this.state.upcomingQuizs}
                onStart={this.onStart}
                isCurrent={true}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Quiz.propTypes = {
  fetchUserQuizs: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  quizs: state.data.quizs,
  user: state.data.user
});

export default connect(mapStateToProps, { fetchUserQuizs, fetchUser })(Quiz);

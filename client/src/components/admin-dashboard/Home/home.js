import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchQuizResults,
  fetchAdminStates
} from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import LineChart from "./LineChart";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [],
      adminStates: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.fetchQuizResults();
    this.props.fetchAdminStates();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizResults) {
      this.setState({ quizs: nextProps.quizResults });
      this.setState({ isLoading: false });
    }
    if (nextProps.adminStates) {
      this.setState({ adminStates: nextProps.adminStates });
    }
  }
  render() {
    const { users, quizs, questions } = this.state.adminStates;
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="row mt-5 ml-4">
              <div className="col">
                <LineChart quizs={this.state.quizs} />
              </div>
              <div className="col ml-5 mt-4">
                <div className="new-card " style={{ maxWidth: "18rem" }}>
                  <div className="card-b ">
                    <div className="card-head">
                      <h5 className="card-title">
                        Total Users: {users ? users.total : null}{" "}
                      </h5>
                    </div>
                    <div className="card-b2">
                      <p className="card-text">
                        Admins: {users ? users.admin : null}
                        <br />
                        Users: {users ? users.user : null}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="new-card mt-3 " style={{ maxWidth: "18rem" }}>
                  <div className="card-b ">
                    <div className="card-head">
                      <h5 className="card-title">
                        Total Quizzes: {quizs ? quizs.total : null}
                      </h5>
                    </div>
                    <div className="card-b2">
                      <p className="card-text">
                        Archived: {quizs ? quizs.archived : null}
                        <br />
                        Ongoing: {quizs ? quizs.ongoing : null}
                        <br />
                        Upcoming: {quizs ? quizs.upcoming : null}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="new-card mt-3 " style={{ maxWidth: "18rem" }}>
                  <div className="card-b ">
                    <div className="card-head">
                      <h5 className="card-title">
                        Total Questions: {questions ? questions.total : null}
                      </h5>
                    </div>
                    <div className="card-b2">
                      <p className="card-text">
                        Easy: {questions ? questions.easy : null}
                        <br />
                        Medium: {questions ? questions.medium : null}
                        <br />
                        Hard: {questions ? questions.hard : null}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  fetchQuizResults: PropTypes.func.isRequired,
  fetchAdminStates: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizResults: state.data.quizResults,
  adminStates: state.data.adminStates
});

export default connect(mapStateToProps, { fetchQuizResults, fetchAdminStates })(
  Home
);

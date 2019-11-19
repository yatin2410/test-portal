import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuizResults } from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import LineChart from "./LineChart";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [],
      currentIndex: 0,
      isLoading: true
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuizResults();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizResults) {
      this.setState({ quizs: nextProps.quizResults });
      this.setState({ isLoading: false });
    }
  }
  onChange(e) {
    console.log(e.target.value);
    this.setState({ currentIndex: e.target.value });
  }
  render() {
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
                <div
                  classNamex="card border-primary"
                  style={{ maxWidth: "18rem" }}>
                  <div className="card-body text-prim1ary">
                    <h5 className="card-title">Total Users: 4</h5>
                    <p className="card-text">
                      Admins: 2
                      <br />
                      Users: 2
                    </p>
                  </div>
                </div>
                <div
                  className="card mt-3 border-primary"
                  style={{ maxWidth: "18rem" }}>
                  <div className="card-body text-prim1ary">
                    <h5 className="card-title">Total Quizzes: 10</h5>
                    <p className="card-text">
                      Archived: 2
                      <br />
                      Ongoing: 2
                      <br />
                      Upcoming: 6
                    </p>
                  </div>
                </div>
                <div
                  className="card mt-3 border-primary"
                  style={{ maxWidth: "18rem" }}>
                  <div className="card-body text-prim1ary">
                    <h5 className="card-title">Total Questions: 20</h5>
                    <p className="card-text">
                      Easy: 10
                      <br />
                      Medium : 5
                      <br />
                      Hard : 5
                    </p>
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
  fetchQuizResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizResults: state.data.quizResults
});

export default connect(mapStateToProps, { fetchQuizResults })(Home);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuizUserResults } from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import SearchTable from "./quizUserResultTable";
import {Link} from "react-router-dom";

class QuizUserResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userResults: null,
      isLoading: true
    };
    this.openInNewTab = this.openInNewTab.bind(this);
    this.onView = this.onView.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuizUserResults(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userResults) {
      this.setState({ userResults: nextProps.userResults });
      this.setState({ isLoading: false });
    }
  }
  openInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }
  onView(id) {
    this.openInNewTab(
      window.location.origin.toString() +
        "/viewquizadmin/" +
        this.props.match.params.id +
        "/" +
        id
    );
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="mt-3">
              <h6 className="mb-4">
                <Link to="/dashboard/results" className="arrowFont">
                  <i
                    class="fas fa-arrow-left arrowFont"
                    style={{ fontSize: "0.75em" }}></i>{" "}
                  Back to Results Page{" "}
                </Link>
              </h6>
              <SearchTable
                quizs={this.state.userResults}
                onView={this.onView}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

QuizUserResults.propTypes = {
  fetchQuizUserResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userResults: state.data.quizUserResults
});

export default connect(mapStateToProps, { fetchQuizUserResults })(
  QuizUserResults
);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchQuizResults } from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import SearchTable from "./quizResultTable";
class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizResults: null,
      isLoading: true
    };
    this.onView = this.onView.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuizResults();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizResults) {
      this.setState({ quizResults: nextProps.quizResults });
      this.setState({ isLoading: false });
    }
  }
  onView(id) {
    this.props.history.push("/dashboard/quiz/result/" + id);
  }
  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="mt-4">
            <SearchTable quizs={this.state.quizResults} onView={this.onView} />
          </div>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  fetchQuizResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizResults: state.data.quizResults
});

export default connect(mapStateToProps, { fetchQuizResults })(Results);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchShowQuestions } from "../../../actions/fetchActions";
import SearchTable from "./questionshowtable";
import Loading from "../../layout/Loading";

class ShowQuizQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestions: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.props.fetchShowQuestions(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.showQuestions && nextProps.showQuestions.data) {
      this.setState({ showQuestions: nextProps.showQuestions.data });
      this.setState({ isLoading: false });
    }
  }
  render() {
    return (
      <div>
        {this.state.isLoading === false ? (
          <SearchTable questions={this.state.showQuestions} />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

ShowQuizQuestions.propTypes = {
  fetchShowQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  showQuestions: state.data.showQuestions
});

export default connect(mapStateToProps, { fetchShowQuestions })(
  ShowQuizQuestions
);

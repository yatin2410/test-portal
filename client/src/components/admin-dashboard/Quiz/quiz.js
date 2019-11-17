import React, { Component } from "react";
import SearchTable from "./quiztable";
import { connect } from "react-redux";
import { fetchQuizs } from "../../../actions/fetchActions";
import {putFlashMsg} from "../../../actions/putActions";
import axios from 'axios';
import PropTypes from "prop-types";
import Loading from "../../layout/Loading";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [],
      isLoading: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onOpenQuestions = this.onOpenQuestions.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuizs();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizs) {
      this.setState({ quizs: nextProps.quizs });
      this.setState({isLoading: false});
    }
  }
  onDismiss(id) {
    axios
    .delete("/api/quiz/", { data: { _id: id } })
    .then(res => {
      this.props.fetchQuizs();
      this.props.putFlashMsg({msg:"Quiz deleted successfully!",type:"alert-danger"});
    })
    .catch(err => {
      console.log(err);
    });    
  }
  onOpenQuestions(id) {
    this.props.history.push("/dashboard/showquestions/" + id);
  }
  onEdit(id) {
    this.props.history.push("/dashboard/editquiz/" + id);
  }
  render() {
    return (
      <div>
        {this.state.isLoading === false ? (
          <div>
            <SearchTable
              quizs={this.state.quizs}
              onDismiss={this.onDismiss}
              onOpenQuestions={this.onOpenQuestions}
              onEdit={this.onEdit}
              history={this.props.history}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

Quiz.propTypes = {
  fetchQuizs :PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  quizs: state.data.quizs,
});

export default connect(
  mapStateToProps,
  { fetchQuizs,putFlashMsg }
)(Quiz);

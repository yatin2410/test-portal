import React, { Component } from "react";
import SearchTable from "./quiztable";
import { connect } from "react-redux";
import { fetchQuizs } from "../../../actions/fetchActions";
import axios from 'axios';
import PropTypes from "prop-types";

class Quiz extends Component {
  constructor(props){
    super(props);
    this.state ={
      quizs : []
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onOpenQuestions = this.onOpenQuestions.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount(){
    this.props.fetchQuizs();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.quizs){
      this.setState({quizs:nextProps.quizs});
    }
  }
  onDismiss(id){
    axios
    .delete("/api/quiz/", { data: { _id: id } })
    .then(res => {
      this.props.fetchQuizs();
    })
    .catch(err => {
      console.log(err);
    });    
  }
  onOpenQuestions(id){
    this.props.history.push("/dashboard/showquestions/"+id);
  }
  onEdit(id){
    this.props.history.push("/dashboard/editquiz/"+id);
  }
  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="row justify-content-md-center">
            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.props.history.push("/dashboard/addquiz")
                }>
                Add Quiz
              </button>
            </div>
          </div>
        </div>
        <SearchTable quizs = {this.state.quizs} onDismiss={this.onDismiss} onOpenQuestions ={this.onOpenQuestions} onEdit = {this.onEdit}/>
      </div>
    );
  }
}

Quiz.propTypes = {
  fetchQuizs :PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  quizs: state.data.quizs
});

export default connect(
  mapStateToProps,
  { fetchQuizs }
)(Quiz);

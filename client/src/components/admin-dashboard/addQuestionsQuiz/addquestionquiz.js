import React, { Component } from "react";
import SearchTable from "./questionaddtable";
import { fetchQuestions,getQuizQuestions } from "../../../actions/fetchActions";
import { addQuizQuestions } from "../../../actions/putActions"
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddQuestionsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      addedQuestions: [],
      errors: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.questions){
      this.setState({questions:nextProps.questions});
    }
    if(nextProps.errors){
        this.setState({errors:nextProps.errors});
    }
    if(nextProps.addedQuestions){
        this.setState({addedQuestions: nextProps.addedQuestions});
    }
  }
  onAdd(id) {
      let {addedQuestions} = this.state;
      addedQuestions.push(id);
      this.setState({addedQuestions});
  }
  onRemove(id){
      let {addedQuestions} = this.state;
      addedQuestions = addedQuestions.filter((item)=>item!==id);
      this.setState({addedQuestions});
  }
  onSubmit(){
    const updateData = {
        _id: this.props.match.params.id,
        questions: this.state.addedQuestions,
    }
    this.props.addQuizQuestions(updateData,this.props.history);
  }
  componentDidMount(){
    this.props.fetchQuestions();
    this.props.getQuizQuestions(this.props.match.params.id);
}
  render() {
    return (
      <div>
        <div className="container mt-4">
            <div className="row justify-content-md-center">
                <button className="btn btn-primary" onClick={this.onSubmit}>
                    Submit
                </button>
            </div>
        </div>
        <SearchTable
          questions={this.state.questions}
          onAdd={this.onAdd}
          onRemove = {this.onRemove}
          addedQuestions = {this.state.addedQuestions}
          >
          </SearchTable>
      </div>
    );
  }
}

AddQuestionsQuiz.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  addQuizQuestions: PropTypes.func.isRequired,
  getQuizQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  questions: state.data.questions,
  errors: state.errors,
  addedQuestions: state.data.addedQuestions,
});

export default connect(
  mapStateToProps,
  { fetchQuestions, addQuizQuestions, getQuizQuestions }
)(AddQuestionsQuiz);

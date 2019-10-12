import React, { Component } from "react";
import "./css/qbank.css";
import SearchTable from "./questiontable.js";
import {fetchQuestions} from "../../../actions/fetchActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class Qbank extends Component {
  constructor(props){
    super(props);
    this.state= {
      questions: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount(){
    this.props.fetchQuestions();
  }
  componentWillReceiveProps(nextProps){
    this.setState({questions:nextProps.questions});
  }
  onEdit(id){
    this.props.history.push('/dashboard/editquestion/'+id);
  }
  onDelete(id){
    axios.delete('/api/questions/',{data:{"_id":id}})
    .then(res => {
      this.props.fetchQuestions();
    })
    .catch(err => {
      console.log(err);
    });
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
                  this.props.history.push("/dashboard/addquestion")
                }>
                Add Question
              </button>
            </div>
          </div>
        </div>
        <SearchTable questions={this.state.questions} onDelete={this.onDelete} onEdit={this.onEdit} ></SearchTable>
      </div>
    );
  }
}
Qbank.propTypes ={
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  questions: state.data.questions,
});

export default connect(
  mapStateToProps,
  {fetchQuestions}
)(Qbank);

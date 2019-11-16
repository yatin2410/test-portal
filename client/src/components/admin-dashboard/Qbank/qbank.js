import React, { Component } from "react";
import SearchTable from "./questiontable.js";
import { fetchQuestions } from "../../../actions/fetchActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Loading from "../../layout/Loading";
import { putFlashMsg } from "../../../actions/putActions";

class Qbank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: true,
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuestions();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.questions) {
      this.setState({ questions: nextProps.questions });
      this.setState({isLoading: false});
    }
  }
  onEdit(id) {
    this.props.history.push("/dashboard/editquestion/" + id);
  }
  onDelete(id){
    axios.delete('/api/questions/',{data:{"_id":id}})
    .then(res => {
      this.props.fetchQuestions();
      this.props.putFlashMsg({msg:"Question deleted successfully!",type:"alert-danger"});
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        {this.state.isLoading ===false ? (
          <div>
            <div className="container mt-5">
              <div className="row justify-content-md-center">
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this.props.history.push("/dashboard/addquestion")
                    }
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
            <SearchTable
              questions={this.state.questions}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
            ></SearchTable>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
Qbank.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  questions: state.data.questions
});

export default connect(
  mapStateToProps,
  {fetchQuestions, putFlashMsg}
)(Qbank);

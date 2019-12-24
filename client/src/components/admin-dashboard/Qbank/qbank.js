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
      searchTerm: "",
      page: 0,
      isLoading: true
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onMore = this.onMore.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.findNewIds = this.findNewIds.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuestions(this.state.page, this.state.searchTerm);
  }
  findNewIds(arr, Id) {
    let ans = arr.find((itm, index) => {
      if (Id === itm) {
        return itm;
      }
    });
    return ans === undefined;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.questions) {
      let oldQuestions = this.state.questions;
      let qids = this.state.questions.map(item => item._id);
      let newQuestions = nextProps.questions.filter(item =>
        this.findNewIds(qids, item._id)
      );
      this.setState({ questions: [...oldQuestions, ...newQuestions] });
      this.setState({ isLoading: false });
    }
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearch() {
    this.props.fetchQuestions(0, this.state.searchTerm);
    this.setState({ page: 0 });
    this.setState({ questions: [] });
  }
  onEdit(id) {
    this.props.history.push("/dashboard/editquestion/" + id);
  }
  onDelete(id) {
    let confirm = window.confirm(
      "ALERT!!. If you select okay then this action will delete Questions and all the data associated with it."
    );
    if (confirm === false) {
      return;
    }

    axios
      .delete("/api/questions/", { data: { _id: id } })
      .then(res => {
        this.props.fetchQuestions(0, this.state.searchTerm);
        this.setState({ page: 0 });
        this.setState({ questions: [] });
        this.props.putFlashMsg({
          msg: "Question deleted successfully!",
          type: "alert-danger"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onMore() {
    this.props.fetchQuestions(this.state.page + 1, this.state.searchTerm);
    this.setState({ page: this.state.page + 1 });
  }
  render() {
    return (
      <div>
        {this.state.isLoading === false ? (
          <div>
            <SearchTable
              questions={this.state.questions}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
              onMore={this.onMore}
              history={this.props.history}
              searchTerm={this.state.searchTerm}
              onSearchChange={this.onSearchChange}
              onSearch={this.onSearch}></SearchTable>
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
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  questions: state.data.questions
});

export default connect(mapStateToProps, { fetchQuestions, putFlashMsg })(Qbank);

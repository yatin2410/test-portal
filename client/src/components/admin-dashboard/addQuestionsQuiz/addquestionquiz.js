import React, { Component } from "react";
import SearchTable1 from "./questionaddtable";
import SearchTable2 from "./questionaddtable2";
import {
  fetchQuestions,
  getQuizQuestions
} from "../../../actions/fetchActions";
import { addQuizQuestions, putFlashMsg } from "../../../actions/putActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../layout/Loading";

class Search extends Component {
  render() {
    const { searchTerm, onSearchChange, children, onSearch } = this.props;
    return (
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            style={{ height: "2em" }}
            id="inputGroup-sizing-lg">
            <i className="material-icons">search</i>
          </span>
        </div>
        <input
          type="text"
          title="press Enter for search"
          value={searchTerm}
          ref={el => (this.input = el)}
          onChange={onSearchChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              onSearch();
            }
          }}
          style={{ height: "2em" }}
          className="form-control"
        />
      </div>
    );
  }
}
class AddQuestionsQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      addedQuestions: [],
      errors: [],
      currentIndex: 1,
      searchTerm: "",
      page: 0,
      isLoading: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMore = this.onMore.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.findNewIds = this.findNewIds.bind(this);
  }
  componentDidMount() {
    this.props.fetchQuestions(0, "");
    this.props.getQuizQuestions(this.props.match.params.id);
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.addedQuestions) {
      this.setState({ addedQuestions: nextProps.addedQuestions });
    }
  }
  onAdd(question) {
    let { addedQuestions } = this.state;
    addedQuestions.push(question);
    this.setState({ addedQuestions });
  }
  onRemove(id) {
    let { addedQuestions } = this.state;
    addedQuestions = addedQuestions.filter(item => item._id !== id);
    this.setState({ addedQuestions });
  }
  onSubmit() {
    let submitQuestions = this.state.addedQuestions.map(item => item._id);
    const updateData = {
      _id: this.props.match.params.id,
      questions: submitQuestions
    };
    this.props.putFlashMsg({
      msg: "Questions added/updated to quiz succsessfully!",
      type: "alert-success"
    });
    this.props.addQuizQuestions(updateData, this.props.history);
  }
  onChange(e) {
    this.setState({ currentIndex: e.target.value });
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearch() {
    this.props.fetchQuestions(0, this.state.searchTerm);
    this.setState({ page: 0 });
    this.setState({ questions: [] });
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
            <div className="container mt-4 mb-3">
              <div className="row justify-content-md-center">
                <div className="col-5 ml-4">
                  <select
                    style={{ width: "50%" }}
                    type="text"
                    className="input"
                    onChange={this.onChange}
                    value={this.state.currentIndex}>
                    <option value={1}>Added Questions</option>
                    <option value={2}>Question Bank</option>
                  </select>
                </div>
                <div className="col">
                  <button className="btn modi-btn" onClick={this.onSubmit}>
                    Submit
                  </button>
                </div>
                {this.state.currentIndex == 2 ? (
                  <div className="col col-lg-4">
                    <Search
                      onSearch={this.onSearch}
                      searchTerm={this.state.searchTerm}
                      onSearchChange={this.onSearchChange}>
                      Search
                    </Search>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              {this.state.currentIndex == 1 ? (
                <SearchTable1
                  onAdd={this.onAdd}
                  onRemove={this.onRemove}
                  addedQuestions={this.state.addedQuestions}></SearchTable1>
              ) : (
                <SearchTable2
                  questions={this.state.questions}
                  onAdd={this.onAdd}
                  onRemove={this.onRemove}
                  addedQuestions={this.state.addedQuestions}
                  onMore={this.onMore}></SearchTable2>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

AddQuestionsQuiz.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
  addQuizQuestions: PropTypes.func.isRequired,
  getQuizQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  questions: state.data.questions,
  errors: state.errors,
  addedQuestions: state.data.addedQuestions.data
});

export default connect(mapStateToProps, {
  fetchQuestions,
  addQuizQuestions,
  getQuizQuestions,
  putFlashMsg
})(AddQuestionsQuiz);

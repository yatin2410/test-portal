import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

const SORTS = {
  NONE: list => list,
  TYPE: list => sortBy(list, "type"),
  CATEGORY: list => sortBy(list, "category"),
  QUESTION: list => sortBy(list, "question"),
  DIFFICULTY: list => sortBy(list, "difficulty")
};

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
            if(event.key === "Enter"){
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

function Sort(props) {
  const { sortKey, onSort, children, activeSortKey } = props;
  const sortClass = classNames(
    "fa fa-fw fa-sort",
    { sortBlack: sortKey === activeSortKey },
    { sortGrey: sortKey !== activeSortKey }
  );
  return (
    <div>
      {children}
      <i onClick={() => onSort(sortKey)} className={sortClass}></i>
    </div>
  );
}
function func(difficulty) {
  if (difficulty === "1") return "<span class=color1>Easy</span>";
  if (difficulty === "2") return "<span class=color2>Medium</span>";
  if (difficulty === "3") return "<span class=color3>Hard</span>";
}

function Table(props) {
  const {
    list,
    sortKey,
    onSort,
    isSortReverse,
    refss,
    onDelete,
    onEdit
  } = props;
  let reverseList = isSortReverse
    ? SORTS[sortKey](list).reverse()
    : SORTS[sortKey](list);
  return (
    <div className="container">
      <h5>
        Total : <span className="text-info">{reverseList.length}</span>
      </h5>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="first">
              <Sort
                sortKey={"QUESTION"}
                onSort={onSort}
                activeSortKey={sortKey}>
                Question
              </Sort>
            </th>
            <th className="second">
              <Sort
                sortKey={"CATEGORY"}
                onSort={onSort}
                activeSortKey={sortKey}>
                Category
              </Sort>{" "}
            </th>
            <th className="third">
              <Sort sortKey={"TYPE"} onSort={onSort} activeSortKey={sortKey}>
                Type
              </Sort>
            </th>
            <th className="fourth">
              <Sort
                sortKey={"DIFFICULTY"}
                onSort={onSort}
                activeSortKey={sortKey}>
                Difficulty
              </Sort>
            </th>
          </tr>
        </thead>
        {reverseList.map(item => (
          <tbody>
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => props.toggleBtn(item._id)}
              key={item._id}>
              <td
                className="cl"
                dangerouslySetInnerHTML={{
                  __html: "<div class='cl'>" + item.question + "</div>"
                }}></td>
              <td
                className="cl"
                dangerouslySetInnerHTML={{
                  __html: item.category === "1" ? "technical" : "aptitude"
                }}></td>
              <td
                className="cl"
                dangerouslySetInnerHTML={{
                  __html: item.type === "1" ? "MCSA" : "MCMA"
                }}></td>
              <td
                className="cl"
                dangerouslySetInnerHTML={{
                  __html: func(item.difficulty)
                }}></td>
            </tr>
            <div
              className={"collapse mt-4 mb-4"}
              ref={ref => (refss[item._id] = ref)}>
              <div className="row justify-content-md-center">
                <div className="col-12">
                  <div style={{ marginLeft: "3em" }}>
                    <h5>Question: </h5>
                    <div>
                      <div
                        className="ml-4"
                        dangerouslySetInnerHTML={{
                          __html: item.question
                        }}></div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mt-2" style={{ marginLeft: "3em" }}>
                    <h5>Options: </h5>
                    <div className="ml-4 row">
                      1.)
                      <div
                        className="ml-2"
                        dangerouslySetInnerHTML={{ __html: item.o1 }}></div>
                    </div>
                    <div className="ml-4 row">
                      2.)
                      <div
                        className="ml-2"
                        dangerouslySetInnerHTML={{ __html: item.o2 }}></div>
                    </div>
                    <div className="ml-4 row">
                      3.)
                      <div
                        className="ml-2"
                        dangerouslySetInnerHTML={{ __html: item.o3 }}></div>
                    </div>
                    <div className="ml-4 row">
                      4.)
                      <div
                        className="ml-2"
                        dangerouslySetInnerHTML={{ __html: item.o4 }}></div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div style={{ marginLeft: "3em" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          "<span class='ans'> Ans: </span> <span class='ml-1.75'> " +
                          item.ans +
                          "</span>"
                      }}></div>
                  </div>
                  <div>
                    <button
                      className="btn mt-4 btn-round btn-lg sp"
                      onClick={() => onEdit(item._id)}>
                      Edit
                    </button>
                    <button
                      className="btn mt-4 ml-3 btn-lg btn-round modi-btn"
                      onClick={() => onDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </tbody>
        ))}
      </table>
    </div>
  );
}

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions,
      sortKey: "NONE",
      isSortReverse: false,
      current: -1
    };
    this.refss = [];
    this.onSort = this.onSort.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
    this.id1 = React.createRef();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ questions: nextProps.questions });
  }
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && this.state.isSortReverse === false;
    this.setState({ sortKey, isSortReverse });
  }

  toggleBtn(id) {
    console.log(id);
    console.log(this.refss[id]);
    if (this.state.current !== -1) {
      window.$(this.refss[this.state.current]).collapse("hide");
    }
    this.setState({ current: id });
    window.$(this.refss[id]).collapse("toggle");
  }
  render() {
    const { questions, sortKey, isSortReverse } = this.state;
    const {searchTerm} = this.props;
    return (
      <div className="container">
        <div className="row mt-4 justify-content-end mr-3">
          <div className="col-3">
            <button
              className="btn modi-btn1"
              onClick={() => this.props.history.push("/dashboard/addquestion")}>
              Add Question
            </button>
          </div>
          <div className="col col-lg-4">
            <Search
              onSearch = {this.props.onSearch}
              searchTerm={searchTerm}
              onSearchChange={this.props.onSearchChange}>
              Search
            </Search>
          </div>
        </div>
        {questions ? (
          <div>
            <div className="row mx-3">
              <Table
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete}
                list={questions}
                toggleBtn={this.toggleBtn}
                onSort={this.onSort}
                id1={this.id1}
                refss={this.refss}
                sortKey={sortKey}
                current={this.props.current}
                onClick={this.props.onClick}
                isSortReverse={isSortReverse}
              />
            </div>
            <div className="row justify-content-md-center">
              <button className="btn modi-btn" onClick={this.props.onMore}>
                More
              </button>
            </div>
          </div>
        ) : (
          <h1>No Questions Found.</h1>
        )}
      </div>
    );
  }
}

export default SearchTable;

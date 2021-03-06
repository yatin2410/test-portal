import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SORTS = {
  NONE: list => list,
  TYPE: list => sortBy(list, "type"),
  CATEGORY: list => sortBy(list, "category"),
  QUESTION: list => sortBy(list, "question"),
  DIFFICULTY: list => sortBy(list, "difficulty")
};

function func(difficulty) {
  if (difficulty === "1") return "<span class=color1>Easy</span>";
  if (difficulty === "2") return "<span class=color2>Medium</span>";
  if (difficulty === "3") return "<span class=color3>Hard</span>";
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

function Table(props) {
  const { list, sortKey, onSort, isSortReverse, refss } = props;
  let reverseList = isSortReverse
    ? SORTS[sortKey](list).reverse()
    : SORTS[sortKey](list);
  return (
    <div className="container">
      <h5>
        Total : <span className="text-info">{reverseList.length}</span>
      </h5>
      <table className="table table-bordered table-hover table-striped">
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
                dangerouslySetInnerHTML={{ __html: item.question }}></td>
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
      isSortReverse: false
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
    window.$(this.refss[id]).collapse("toggle");
  }
  render() {
    const { questions, sortKey, isSortReverse } = this.state;
    return (
      <div className="container mt-3">
        <h6>
          <Link to="/dashboard/quiz" className="arrowFont">
            <i
              class="fas fa-arrow-left arrowFont"
              style={{ fontSize: "0.75em" }}></i>{" "}
            Back to Quiz Page{" "}
          </Link>
        </h6>
        <div className="ml-4 mb-4"></div>
        {questions ? (
          <div className="row mx-3">
            <Table
              list={questions}
              toggleBtn={this.toggleBtn}
              onSort={this.onSort}
              id1={this.id1}
              refss={this.refss}
              sortKey={sortKey}
              isSortReverse={isSortReverse}
            />
          </div>
        ) : (
          <h1>No Questions Found.</h1>
        )}
      </div>
    );
  }
}

export default SearchTable;

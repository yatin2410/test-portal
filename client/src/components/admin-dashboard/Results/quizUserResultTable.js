import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

const SORTS = {
  NONE: list => list,
  NAME: list => sortBy(list, "name"),
  TOTAL: list => sortBy(list, "list"),
  ATTEMPTED: list => sortBy(list, "attempted"),
  CORRECT: list => sortBy(list, "correct"),
  PER: list => sortBy(list, "per"),
  PERTOPASS: list => sortBy(list, "perToPass"),
  RESULT: list => sortBy(list, "result")
};

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
  const { list, sortKey, onSort, isSortReverse, onView } = props;
  let reverseList = isSortReverse
    ? SORTS[sortKey](list).reverse()
    : SORTS[sortKey](list);
  return (
    <div className="container">
      <h5>
        Total : <span className="text-info">{reverseList.length}</span>
      </h5>
      <table className="table table-bordered table-hover modifiedtable">
        <thead>
          <tr>
            <th>
              <Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>
                Name
              </Sort>{" "}
            </th>
            <th>
              <Sort sortKey={"TOTAL"} onSort={onSort} activeSortKey={sortKey}>
                Total
              </Sort>{" "}
            </th>
            <th>
              <Sort
                sortKey={"ATTEMPTED"}
                onSort={onSort}
                activeSortKey={sortKey}>
                <span style={{ fontSize: "0.85em" }}>Attempted</span>
              </Sort>{" "}
            </th>
            <th>
              <Sort sortKey={"CORRECT"} onSort={onSort} activeSortKey={sortKey}>
                Correct
              </Sort>{" "}
            </th>
            <th>
              <Sort sortKey={"PER"} onSort={onSort} activeSortKey={sortKey}>
                <span style={{ fontSize: "0.85em" }}>Percentage</span>
              </Sort>{" "}
            </th>
            <th>
              <Sort
                sortKey={"PERTOPASS"}
                onSort={onSort}
                activeSortKey={sortKey}>
                <span style={{ fontSize: "0.85em" }}>Required</span>
              </Sort>{" "}
            </th>
            <th>
              <Sort sortKey={"RESULT"} onSort={onSort} activeSortKey={sortKey}>
                Result
              </Sort>{" "}
            </th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {reverseList.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.total}</td>
              <td>{item.attempted}</td>
              <td>{item.correct}</td>
              <td>{item.per + " %"}</td>
              <td>{item.perToPass + " %"}</td>
              <td>
                {item.result === "Pass" ? (
                  <span className="text-success">{item.result}</span>
                ) : (
                  <span className="text-danger">{item.result}</span>
                )}
              </td>
              <td>
                <button className="btn" onClick={() => onView(item._id)}>
                  <i className="material-icons">play_arrow</i>
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

class SearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: props.quizs,
      sortKey: "NONE",
      isSortReverse: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quizs) {
      this.setState({ quizs: nextProps.quizs });
    }
  }
  render() {
    const { quizs, sortKey, isSortReverse } = this.state;
    return (
      <div className="container">
        {quizs ? (
          <div className="row mx-3">
            <Table
              list={quizs}
              onSort={this.onSort}
              sortKey={sortKey}
              isSortReverse={isSortReverse}
              onView={this.props.onView}
            />
          </div>
        ) : (
          <h3>No Quizzes Found.</h3>
        )}
      </div>
    );
  }
}

export default SearchTable;

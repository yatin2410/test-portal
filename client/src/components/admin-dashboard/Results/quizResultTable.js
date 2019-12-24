import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

const SORTS = {
  NONE: list => list,
  NAME: list => sortBy(list, "name"),
  TOTAL: list => sortBy(list, "total"),
  PASSED: list => sortBy(list, "passed"),
  FAILED: list => sortBy(list, "failed"),
  PER: list => sortBy(list, "totalPer"),
  PERTOPASS: list => sortBy(list, "perToPass")
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
            <th style={{ width: "24%" }}>
              <Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>
                Name
              </Sort>{" "}
            </th>
            <th style={{ width: "10%" }}>
              <Sort sortKey={"TOTAL"} onSort={onSort} activeSortKey={sortKey}>
                Total
              </Sort>{" "}
            </th>
            <th style={{ width: "10%" }}>
              <Sort sortKey={"PASSED"} onSort={onSort} activeSortKey={sortKey}>
                Passed
              </Sort>{" "}
            </th>
            <th style={{ width: "10%" }}>
              <Sort sortKey={"FAILED"} onSort={onSort} activeSortKey={sortKey}>
                Failed
              </Sort>{" "}
            </th>
            <th style={{ width: "18%" }}>
              <Sort sortKey={"PER"} onSort={onSort} activeSortKey={sortKey}>
                <span style={{ fontSize: "0.85em" }}>Avg. Percentage</span>
              </Sort>{" "}
            </th>
            <th style={{ width: "18%" }}>
              <Sort
                sortKey={"PERTOPASS"}
                onSort={onSort}
                activeSortKey={sortKey}>
                <span style={{ fontSize: "0.85em" }}>Required</span>
              </Sort>{" "}
            </th>
            <th style={{ width: "10%" }}>Export</th>
          </tr>
        </thead>
        <tbody>
          {reverseList.map(item => (
            <tr key={item.qid}>
              <td>{item.name}</td>
              <td>{item.total}</td>
              <td>{item.passed}</td>
              <td>{item.failed}</td>
              <td>
                {(Number(item.totalPer) / Number(item.total)).toFixed(2) + " %"}
              </td>
              <td>{item.perToPass + " %"}</td>
              <td>
                <button
                  className="btn modi-btn"
                  onClick={() => onView(item.qid)}
                  title="export result as excel sheet">
                  <i className="material-icons">arrow_downward</i>
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
    this.onSort = this.onSort.bind(this);
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
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && this.state.isSortReverse === false;
    this.setState({ sortKey, isSortReverse });
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

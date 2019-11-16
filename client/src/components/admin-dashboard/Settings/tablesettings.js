import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

const SORTS = {
  NONE: list => list,
  ID: list => sortBy(list, "Id"),
  NAME: list => sortBy(list, "name"),
  EMAIL: list => sortBy(list, "email")
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
  const { list, sortKey, onSort, onDismiss, isSortReverse } = props;
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
            <th>
              <Sort sortKey={"ID"} onSort={onSort} activeSortKey={sortKey}>
                Id
              </Sort>
            </th>
            <th>
              <Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>
                Name
              </Sort>{" "}
            </th>
            <th>
              <Sort sortKey={"EMAIL"} onSort={onSort} activeSortKey={sortKey}>
                Email
              </Sort>
            </th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {reverseList.map(item => (
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button className="btn modi-btn" onClick={() => onDismiss(item.Id)}>
                  <i className="material-icons">delete</i>
                </button>
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
      users: props.users,
      sortKey: "NONE",
      isSortReverse: false
    };
    this.onSort = this.onSort.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && this.state.isSortReverse === false;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { users, sortKey, isSortReverse } = this.state;
    return (
      <div className="container">
        <div className="row my-4 ml-4">
          <h4>Other Admins:</h4>
        </div>
        {users ? (
          <div className="row mx-3">
            <Table
              list={users}
              onDismiss={this.props.onDismiss}
              onSort={this.onSort}
              sortKey={sortKey}
              isSortReverse={isSortReverse}
            />
          </div>
        ) : (
          <h3>No Other Admins.</h3>
        )}
      </div>
    );
  }
}

export default SearchTable;

import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

const SORTS = {
  NONE: list => list,
  GROUP: list => sortBy(list, "group")
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
      <table
        className="table table-bordered table-hover modifiedtable"
        style={{ width: "60%" }}>
        <thead>
          <tr>
            <th width="60%">
              <Sort sortKey={"GROUP"} onSort={onSort} activeSortKey={sortKey}>
                Group
              </Sort>
            </th>
            <th width="40%">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {reverseList.map(item => (
            <tr key={item.group}>
              <td>{item.group}</td>
              <td>
                <button
                  data-toggle="tooltip"
                  title="This action will delete group and all the users associated with it."
                  data-placement="right"
                  className="btn modi-btn"
                  onClick={() => onDismiss(item.group)}>
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

class GroupTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: props.groups,
      sortKey: "NONE",
      isSortReverse: false
    };
    this.onSort = this.onSort.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ groups: nextProps.groups });
  }
  onSort(sortKey) {
    const isSortReverse =
      this.state.sortKey === sortKey && this.state.isSortReverse === false;
    this.setState({ sortKey, isSortReverse });
  }
  render() {
    const { groups, sortKey, isSortReverse } = this.state;
    return (
      <div className="container">
        <div className="row ml-5">
          <h4>Groups:</h4>
        </div>
        {groups ? (
          <div className="row ml-5">
            <Table
              list={groups}
              onDismiss={this.props.onDeleteGroup}
              onSort={this.onSort}
              sortKey={sortKey}
              isSortReverse={isSortReverse}
            />
          </div>
        ) : (
          <h5 className="ml-4">No Groups Found.</h5>
        )}
      </div>
    );
  }
}

export default GroupTable;

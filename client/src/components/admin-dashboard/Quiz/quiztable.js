import React, { Component } from "react";
import { sortBy } from 'lodash';
import classNames from 'classnames';
import quiz from "./quiz";

const SORTS = {
    NONE: list => list,
    NAME: list => sortBy(list, 'name'),
    STARTDATE: list => sortBy(list, 'startDate'),
    DURATION: list => sortBy(list, 'duration'),
    PERTOPASS: list => sortBy(list,'perToPass'),
    GROUPS: list => sortBy(list,'groups'),
  };
  
  
  function Sort(props){
    const {sortKey,onSort,children,activeSortKey} = props;
    const sortClass = classNames(
      'fa fa-fw fa-sort',
      {'sortBlack':sortKey===activeSortKey},
      {'sortGrey':sortKey!==activeSortKey}
    )
    return(
      <div>
        {children}
        <i onClick={()=>onSort(sortKey)} className={sortClass}></i>
      </div>
    );
  }
  
  function Table(props){
    const {list,sortKey,onSort,onDismiss,isSortReverse, onOpenQuestions, onEdit
    } = props;
    let reverseList = isSortReverse ? SORTS[sortKey](list).reverse() : SORTS[sortKey](list);
    return(
      <div className="container">
        <h5>
          Total : <span className="text-info">{reverseList.length}</span> 
        </h5>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th style={{width:"20%"}}><Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>Name</Sort> </th>
            <th style={{width:"20%"}}><Sort sortKey={"STARTDATE"} onSort={onSort} activeSortKey={sortKey}>StartDate</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"DURATION"} onSort={onSort} activeSortKey={sortKey}>Duration</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"PERTOPASS"} onSort={onSort} activeSortKey={sortKey}>PerToPass</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"GROUPS"} onSort={onSort} activeSortKey={sortKey}>Groups</Sort> </th>
            <th style={{width:"5%"}}>Questions</th>
            <th style={{width:"5%"}}>Edit</th>
            <th style={{width:"5%"}}>DELETE</th>
          </tr>
        </thead>
        <tbody>
        {
          reverseList.map(
            (item)=>
              <tr key={item._id}>
                <td >{item.name}</td>
                <td >{item.startDate}</td>
                <td >{item.duration+" min"}</td>
                <td >{item.perToPass+" %"}</td>
                <td >{item.groups.map((item)=><span className="row ml-1">{item}</span>)}</td>
                <td ><button className="btn" onClick={()=>onOpenQuestions(item._id)}><i className="material-icons">open_in_new</i></button></td>
                <td ><button className="btn"><i className="material-icons" onClick={()=>onEdit(item._id)}>edit</i></button></td>
                <td >
                  <button  className="btn btn-danger" onClick = {()=>onDismiss(item._id)}>
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
          )
        }
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
      this.onSort = this.onSort.bind(this);
    }
    componentWillReceiveProps(nextProps){
      this.setState({quizs:nextProps.quizs});
    }
    onSort(sortKey){
      const isSortReverse = this.state.sortKey === sortKey && this.state.isSortReverse===false;
      this.setState({sortKey, isSortReverse});
    }

    render() {
      const { quizs, sortKey, isSortReverse } = this.state;
    return (
        <div className="container">
          {quizs ? (
            <div className="row mx-3">
              <Table
                list={quizs}
                onDismiss={this.props.onDismiss}
                onSort={this.onSort}
                sortKey={sortKey}
                onOpenQuestions = {this.props.onOpenQuestions}
                isSortReverse={isSortReverse}
                onEdit = {this.props.onEdit}
              />
            </div>
          ) : (
            <h1>No Users Found.</h1>
          )}
        </div>
        );
    }
  }
  
  export default SearchTable;
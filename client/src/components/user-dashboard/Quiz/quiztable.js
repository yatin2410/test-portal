import React, { Component } from "react";
import { sortBy } from 'lodash';
import classNames from 'classnames';

const SORTS = {
    NONE: list => list,
    NAME: list => sortBy(list, 'name'),
    STARTDATE: list => sortBy(list, 'startDate'),
    ENDDATE: list => sortBy(list, 'endDate'),
    DURATION: list => sortBy(list, 'duration'),
    PERTOPASS: list => sortBy(list,'perToPass'),
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
    const {list,sortKey,onSort,isSortReverse, isCurrent, onStart,takenQuizs
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
            <th style={{width:"20%"}}><Sort sortKey={"ENDDATE"} onSort={onSort} activeSortKey={sortKey}>endDate</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"DURATION"} onSort={onSort} activeSortKey={sortKey}><span style={{fontSize:"0.85em"}}>Duration</span></Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"PERTOPASS"} onSort={onSort} activeSortKey={sortKey}><span style={{fontSize:"0.85em"}}>PerToPass</span></Sort> </th>
            <th>Start</th>
          </tr>
        </thead>
        <tbody>
        {
          reverseList.map(
            (item)=>
              <tr key={item._id}>
                <td >{item.name}</td>
                <td >{item.startDate}</td>
                <td >{item.endDate}</td>
                <td >{item.duration+" min"}</td>
                <td >{item.perToPass+" %"}</td>
                <td ><button className="btn" disabled={!isCurrent || takenQuizs.indexOf(item._id)!==-1} onClick={()=>onStart(item._id)}><i className="material-icons">play_arrow</i></button> </td>
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
        isSortReverse: false,
        takenQuizs: [],
      };
      this.onSort = this.onSort.bind(this);
    }
    componentWillReceiveProps(nextProps){
      if(nextProps.quizs){
        this.setState({quizs:nextProps.quizs});
      }
      if(nextProps.takenQuizs){
        this.setState({takenQuizs:nextProps.takenQuizs});
      }
    }
    onSort(sortKey){
      const isSortReverse = this.state.sortKey === sortKey && this.state.isSortReverse===false;
      this.setState({sortKey, isSortReverse});
    }

    render() {
      const { quizs, takenQuizs,sortKey, isSortReverse } = this.state;
    return (
        <div className="container">
          {quizs ? (
            <div className="row mx-3">
              <Table
                takenQuizs = {takenQuizs}
                list={quizs}
                onSort={this.onSort}
                sortKey={sortKey}
                isSortReverse={isSortReverse}
                onStart = {this.props.onStart}
                isCurrent = {this.props.isCurrent}
              />
            </div>
          ) : (
            <h3>No Quizs Found.</h3>
          )}
        </div>
        );
    }
  }
  
  export default SearchTable;
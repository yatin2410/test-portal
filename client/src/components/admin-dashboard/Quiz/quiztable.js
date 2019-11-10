import React, { Component } from "react";
import { sortBy } from 'lodash';
import classNames from 'classnames';
import Moment from 'react-moment';
import quiz from "./quiz";

const SORTS = {
    NONE: list => list,
    NAME: list => sortBy(list, 'name'),
    STARTDATE: list => sortBy(list, 'startDate'),
    ENDDATE: list => sortBy(list, 'endDate'),
    DURATION: list => sortBy(list, 'duration'),
    PERTOPASS: list => sortBy(list,'perToPass'),
    GROUPS: list => sortBy(list,'groups'),
  };
  
  class Search extends Component{
    render(){
      const {searchTerm,onSearchChange,children} = this.props;
      return(
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">{children}</span>
          </div>
          <input  type="text" value = {searchTerm} ref={el => this.input=el} onChange = {onSearchChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>       
        </div>
      );
    }
  }
  
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
    const {list,sortKey,onSort,onDismiss,isSortReverse, onOpenQuestions, onEdit, searchTerm
    } = props;
    let reverseList = isSortReverse ? SORTS[sortKey](list).reverse() : SORTS[sortKey](list);
    reverseList =  reverseList.filter((item)=>item.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 || item.startDate.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 || item.endDate.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 || item.duration === Number(searchTerm) || item.perToPass === Number(searchTerm) || item.groups.indexOf(searchTerm) !== -1);
    return(
      <div className="container">
        <h5>
          Total : <span className="text-info">{reverseList.length}</span> 
        </h5>
      <table className="table table-bordered table-hover table-striped modifiedtable">
        <thead>
          <tr>
            <th style={{width:"14%"}}><Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>Name</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"STARTDATE"} onSort={onSort} activeSortKey={sortKey}>Start Date</Sort> </th>
            <th style={{width:"15%"}}><Sort sortKey={"ENDDATE"} onSort={onSort} activeSortKey={sortKey}>End Date</Sort> </th>
            <th style={{width:"12%"}}><Sort sortKey={"DURATION"} onSort={onSort} activeSortKey={sortKey}><span style={{fontSize:"0.85em"}}>Duration</span></Sort> </th>
            <th style={{width:"12%"}}><Sort sortKey={"PERTOPASS"} onSort={onSort} activeSortKey={sortKey}><span style={{fontSize:"0.85em"}}>Percentage</span></Sort> </th>
            <th style={{width:"12%"}}><Sort sortKey={"GROUPS"} onSort={onSort} activeSortKey={sortKey}>Groups</Sort> </th>
            <th style={{width:"8%"}}><span style={{fontSize:"0.8em"}}>Questions</span></th>
            <th style={{width:"7%"}}>Edit</th>
            <th style={{width:"8%"}}>DELETE</th>
          </tr>
        </thead>
        <tbody>
        {
          reverseList.map(
            (item)=>
              <tr key={item._id}>
                <td >{item.name}</td>
                <td ><Moment format="YYYY-MM-DD HH:mm" local>{item.startDate.toLocaleString()}</Moment></td>
                <td ><Moment format="YYYY-MM-DD HH:mm" local>{item.endDate.toLocaleString()}</Moment></td>
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
        searchTerm: "",
        isSortReverse: false
      };
      this.onSort = this.onSort.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);    
    }
    componentWillReceiveProps(nextProps){
      this.setState({quizs:nextProps.quizs});
    }
    onSort(sortKey){
      const isSortReverse = this.state.sortKey === sortKey && this.state.isSortReverse===false;
      this.setState({sortKey, isSortReverse});
    }
    onSearchChange(event){
      this.setState({searchTerm:event.target.value});
    }

    render() {
      const { quizs, searchTerm, sortKey, isSortReverse } = this.state;
    return (
        <div className="container">
          <div className="row my-4 justify-content-md-center">
            <div className="col col-lg-5">
              <Search
                searchTerm={searchTerm}
                onSearchChange={this.onSearchChange}>
                search
              </Search>
            </div>
          </div>
          {quizs ? (
            <div className="row mx-3">
              <Table
                list={quizs}
                onDismiss={this.props.onDismiss}
                searchTerm={searchTerm}
                onSort={this.onSort}
                sortKey={sortKey}
                onOpenQuestions = {this.props.onOpenQuestions}
                isSortReverse={isSortReverse}
                onEdit = {this.props.onEdit}
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
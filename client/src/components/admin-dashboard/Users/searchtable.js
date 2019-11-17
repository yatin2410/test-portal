import React, { Component } from "react";
import { sortBy } from 'lodash';
import classNames from 'classnames';

const SORTS = {
    NONE: list => list,
    ID: list => sortBy(list, 'Id'),
    NAME: list => sortBy(list, 'name'),
    EMAIL: list => sortBy(list, 'email'),
    GROUP: list => sortBy(list, 'group'),
  };
  
  class Search extends Component{
    render(){
      const {searchTerm,onSearchChange,children} = this.props;
      return(
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" style={{height:"2em"}} id="inputGroup-sizing-lg"><i className="material-icons">search</i></span>
          </div>
          <input  type="text" value = {searchTerm} ref={el => this.input=el} onChange = {onSearchChange} style={{height:"2em"}} className="form-control" />       
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
    const {list,sortKey,onSort,onDismiss,isSortReverse, searchTerm,onOpenResult} = props;
    let reverseList = isSortReverse ? SORTS[sortKey](list).reverse() : SORTS[sortKey](list);
    reverseList =  reverseList.filter((item)=>item.email.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 || item.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1 || item.group.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    return(
      <div className="container">
        <h5>
          Total : <span className="text-info">{reverseList.length}</span> 
        </h5>
      <table className="table table-bordered table-hover modifiedtable">
        <thead>
          <tr>
            <th style={{width:"20%"}}><Sort sortKey={"ID"} onSort={onSort} activeSortKey={sortKey}>Id</Sort></th>
            <th style={{width:"20%"}}><Sort sortKey={"NAME"} onSort={onSort} activeSortKey={sortKey}>Name</Sort> </th>
            <th style={{width:"20%"}}><Sort sortKey={"EMAIL"} onSort={onSort} activeSortKey={sortKey}>Email</Sort></th>
            <th style={{width:"20%"}}><Sort sortKey={"GROUP"} onSort={onSort} activeSortKey={sortKey}>Group</Sort></th>
            <th style={{width:"10%"}}>Result</th>
            <th style={{width:"10%"}}>Delete</th>
          </tr>
        </thead>
        <tbody>
        {
          reverseList.map(
            (item)=>
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.group}</td>
                <td>
                  <button className="btn modi-btn" onClick={()=>onOpenResult(item._id)}>
                    <i className="material-icons">assessment</i>
                  </button>
                </td>
                <td>
                  <button  className="btn modi-btn" onClick = {()=>onDismiss(item.Id)}>
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
        users: props.users,
        searchTerm: "",
        sortKey: "NONE",
        isSortReverse: false
      };
      this.onSort = this.onSort.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);    
    }
    componentWillReceiveProps(nextProps){
      this.setState({users:nextProps.users});
    }
    onSort(sortKey){
      const isSortReverse = this.state.sortKey === sortKey && this.state.isSortReverse===false;
      this.setState({sortKey, isSortReverse});
    }
    onSearchChange(event){
      this.setState({searchTerm:event.target.value});
    }
   
    render() {
      const { users, searchTerm, sortKey, isSortReverse } = this.state;
    return (
        <div className="container">
          <div className="row mt-4 justify-content-end mr-3">
            <div className="col col-lg-4" style={{float:"right"}}>
              <Search
                searchTerm={searchTerm}
                onSearchChange={this.onSearchChange}>
                Search
              </Search>
            </div>
          </div>
          {users ? (
            <div className="row mx-3">
              <Table
                list={users}
                searchTerm={searchTerm}
                onDismiss={this.props.onDismiss}
                onSort={this.onSort}
                sortKey={sortKey}
                isSortReverse={isSortReverse}
                onOpenResult={this.props.onOpenResult}
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
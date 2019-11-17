import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/fetchActions";
import {putFlashMsg} from "../../../actions/putActions";
import axios from 'axios';
import SearchTable from './searchtable';
import Loading from "../../layout/Loading";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onOpenResult = this.onOpenResult.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.users){
      this.setState({ users: nextProps.users.filter((item)=>item.IsAdmin === false) });
      this.setState({isLoading:false});
    }
  }
  onDismiss(id){
    let confirm = window.confirm("ALERT!!. If you select okay then this action will delete User and all the data associated with it.");
    if(confirm===false){
      return;
    }
    axios.delete('/api/users/',{data:{"Id":id}})
    .then(res => {
      this.props.fetchUsers();
      this.props.putFlashMsg({msg:"User deleted successfully!",type:"alert-danger"});
    })
    .catch(err => {
      console.log(err);
    });
  }
  onOpenResult(id){
    this.props.history.push("/dashboard/user/result/"+id);
  }
  render() {
    console.log(this.state.users);
    return (
      <div>
      {this.state.isLoading === false ?
      <SearchTable 
        onDismiss={this.onDismiss}
        onOpenResult = {this.onOpenResult}
        users ={this.state.users}
      />: <Loading/>}
      </div>
    );
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.data.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchUsers,putFlashMsg }
)(Users);

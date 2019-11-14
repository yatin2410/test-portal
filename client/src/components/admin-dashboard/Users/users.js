import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/fetchActions";
import {putFlashMsg} from "../../../actions/putActions";
import axios from 'axios';
import SearchTable from './searchtable';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users.filter((item)=>item.IsAdmin === false) });
  }
  onDismiss(id){
    axios.delete('/api/users/',{data:{"Id":id}})
    .then(res => {
      this.props.fetchUsers();
      this.props.putFlashMsg({msg:"User deleted successfully!",type:"alert-danger"});
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    return (
      <SearchTable 
        onDismiss={this.onDismiss}
        users ={this.state.users}
      />
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

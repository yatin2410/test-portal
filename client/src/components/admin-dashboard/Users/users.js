import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/fetchActions";
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
    axios.delete('/api/users/',{data:{"Id":id}})
    .then(res => {
      this.props.fetchUsers();
    })
    .catch(err => {
      console.log(err);
    });
  }
  render() {
    console.log(this.state.users);
    return (
      <div>
      {this.state.isLoading === false ?
      <SearchTable 
        onDismiss={this.onDismiss}
        users ={this.state.users}
      />: <Loading/>}
      </div>
    );
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.data.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Users);

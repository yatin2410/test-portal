import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers, fetchGroups } from "../../../actions/fetchActions";
import axios from "axios";
import SearchTable from "./tablesettings";
import RegisterAdmin from "./registerAdmin";
import GroupTable from "./groupTable";
import RegisterGroup from "./registerGroup";
import { putFlashMsg } from "../../../actions/putActions";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: []
    };
    this.onDeleteGroup = this.onDeleteGroup.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidMount() {
    window.$('[data-toggle="tooltip"]').tooltip();
    this.props.fetchUsers();
    this.props.fetchGroups();
  }
  
  componentDidUpdate() {
    window.$('[data-toggle="tooltip"]').tooltip();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      this.setState({
        users: nextProps.users.filter(
          item => item._id !== nextProps.auth.user.id && item.IsAdmin === true
        )
      });
    }
    if (nextProps.groups) {
      console.log(nextProps.groups);
      this.setState({
        groups: nextProps.groups
      });
    }
  }
  onDeleteGroup(group){
    let confirm = window.confirm("ALERT!!. If you select okay then this action will delete group and all the users associated with it.");
    if(confirm===false){
      return;
    }
    axios
      .delete("/api/groups/", { data: { group: group } })
      .then(res => {
        this.props.fetchGroups();
        this.props.putFlashMsg({msg:"Group deleted successfully!",type:"alert-danger"});
      })
      .catch(err => {
        console.log(err);
      });    
  }
  onDismiss(id) {
    axios
      .delete("/api/users/", { data: { Id: id } })
      .then(res => {
        this.props.fetchUsers();
        this.props.putFlashMsg({msg:"Admin deleted successfully!",type:"alert-danger"});
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center mt-3">
          <div className="col-6">
            <RegisterAdmin fetchUsers={this.props.fetchUsers} />
          </div>
          <div className="col-6">
            <SearchTable onDismiss={this.onDismiss} users={this.state.users} />
          </div>
        </div>
        <hr className="mt-5"/>
        <div className="row justify-content-md-center mt-3">
          <div className="col-4 ">
            <GroupTable onDeleteGroup={this.onDeleteGroup} groups={this.state.groups} />
          </div>
          <div className="col-6">
          <RegisterGroup   fetchGroups={this.props.fetchGroups} />
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  putFlashMsg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.data.users,
  auth: state.auth,
  groups: state.data.groups
});

export default connect(
  mapStateToProps,
  { fetchUsers,fetchGroups,putFlashMsg }
)(Settings);

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
import Loading from "../../layout/Loading";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
      isLoading: true
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
      this.setState({
        groups: nextProps.groups
      });
      this.setState({ isLoading: false });
    }
  }
  onDeleteGroup(group) {
    let confirm = window.confirm(
      "ALERT!!. If you select okay then this action will delete group and all the users associated with it."
    );
    if (confirm === false) {
      return;
    }
    axios
      .delete("/api/groups/", { data: { group: group } })
      .then(res => {
        this.props.fetchGroups();
        this.props.putFlashMsg({
          msg: "Group deleted successfully!",
          type: "alert-danger"
        });
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
        this.props.putFlashMsg({
          msg: "Admin deleted successfully!",
          type: "alert-danger"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container mt-4" style={{ marginBottom: "100px" }}>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="row justify-content-md-center">
              <div className="col-6">
                <RegisterGroup fetchGroups={this.props.fetchGroups} />
              </div>
              <div className="col-6">
                <GroupTable
                  onDeleteGroup={this.onDeleteGroup}
                  groups={this.state.groups}
                />
              </div>
            </div>
            {/* <div className="row mt-5 justify-content-md-center">
              <div className="col-6">
                <RegisterAdmin fetchUsers={this.props.fetchUsers} />
              </div>
              <div className="col-6">
                <SearchTable
                  onDismiss={this.onDismiss}
                  users={this.state.users}
                />
              </div>
            </div> */}
          </div>
        )}
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

export default connect(mapStateToProps, {
  fetchUsers,
  fetchGroups,
  putFlashMsg
})(Settings);

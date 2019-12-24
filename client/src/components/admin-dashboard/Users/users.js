import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUsers } from "../../../actions/fetchActions";
import { putFlashMsg } from "../../../actions/putActions";
import axios from "axios";
import SearchTable from "./searchtable";
import Loading from "../../layout/Loading";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: "",
      page: 0,
      isLoading: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onOpenResult = this.onOpenResult.bind(this);
    this.onMore = this.onMore.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.findNewIds = this.findNewIds.bind(this);
  }
  componentDidMount() {
    this.props.fetchUsers(this.state.page, this.state.searchTerm);
  }
  findNewIds(arr, Id) {
    let ans = arr.find((itm, index) => {
      if (Id === itm) {
        return itm;
      }
    });
    return ans === undefined;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users) {
      let oldUsers = this.state.users;
      let uids = this.state.users.map(item => item._id);
      let newUsers = nextProps.users.filter(item =>
        this.findNewIds(uids, item._id)
      );
      this.setState({
        users: [...oldUsers, ...newUsers.filter(item => item.IsAdmin === false)]
      });
      this.setState({ isLoading: false });
    }
  }
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  onSearch() {
    this.props.fetchUsers(0, this.state.searchTerm);
    this.setState({ page: 0 });
    this.setState({ users: [] });
  }
  onDismiss(id) {
    let confirm = window.confirm(
      "ALERT!!. If you select okay then this action will delete User and all the data associated with it."
    );
    if (confirm === false) {
      return;
    }
    axios
      .delete("/api/users/", { data: { Id: id } })
      .then(res => {
        this.props.fetchUsers(0, this.state.searchTerm);
        this.setState({ page: 0 });
        this.setState({ users: [] });
        this.props.putFlashMsg({
          msg: "User deleted successfully!",
          type: "alert-danger"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onMore() {
    this.props.fetchUsers(this.state.page + 1, this.state.searchTerm);
    this.setState({ page: this.state.page + 1 });
  }
  onOpenResult(id) {
    this.props.history.push("/dashboard/user/result/" + id);
  }
  render() {
    return (
      <div>
        {this.state.isLoading === false ? (
          <SearchTable
            onDismiss={this.onDismiss}
            onOpenResult={this.onOpenResult}
            users={this.state.users}
            onMore={this.onMore}
            searchTerm={this.state.searchTerm}
            onSearchChange={this.onSearchChange}
            onSearch={this.onSearch}
          />
        ) : (
          <Loading />
        )}
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

export default connect(mapStateToProps, { fetchUsers, putFlashMsg })(Users);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserResults, fetchUser } from "../../../actions/fetchActions";
import SearchTable from "./userResultTable";
import Loading from "../../layout/Loading";
import { Link } from "react-router-dom";

class UserResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [],
      userName: "",
      isLoading: true
    };
    this.onView = this.onView.bind(this);
    this.openInNewTab = this.openInNewTab.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserResults(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.results) {
      let arr = [];
      nextProps.results.quizDatail.forEach(item => {
        let result;
        nextProps.results.quizs.forEach(itm => {
          if (itm.qid === item._id) {
            result = itm;
          }
        });
        arr.push({ quiz: item, result });
      });
      this.setState({ quizs: arr });
      this.setState({ isLoading: false });
    }
    if (nextProps.user && nextProps.user.name) {
      this.setState({ userName: nextProps.user.name });
    }
  }
  openInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }
  onView(id) {
    this.openInNewTab(
      window.location.origin.toString() +
        "/viewquizadmin/" +
        id +
        "/" +
        this.props.match.params.id
    );
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="mt-5">
              <h6>
                <Link to="/dashboard/users" className="arrowFont">
                  <i
                    class="fas fa-arrow-left arrowFont"
                    style={{ fontSize: "0.75em" }}></i>{" "}
                  Back to Users Page{" "}
                </Link>
              </h6>
              <h4 className="row justify-content-md-center">
                {this.state.userName + "'s Quizzes"}
              </h4>
              <SearchTable quizs={this.state.quizs} onView={this.onView} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserResult.propTypes = {
  fetchUserResults: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  results: state.data.results,
  user: state.data.user
});

export default connect(mapStateToProps, { fetchUserResults, fetchUser })(
  UserResult
);

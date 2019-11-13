import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserResults } from "../../../actions/fetchActions";
import SearchTable from "./resulttable";
import Loading from '../../layout/Loading';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      onGoingQuizs: [],
      pastQuizs: [],
      isLoading: true,
    };
    this.onView = this.onView.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserResults(this.props.auth.user.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.results) {
      this.setState(nextProps.results);
      let arr1 = [],
        arr2 = [];
      nextProps.results.quizDatail.forEach(item => {
        if (new Date(item.endDate).getTime() > new Date().getTime()) {
          let result;
          nextProps.results.quizs.forEach(itm => {
            if (Object.keys(itm)[0] === item._id) {
              result = itm[item._id];
            }
          });
          arr1.push({ quiz: item, result });
        } else {
          let result;
          nextProps.results.quizs.forEach(itm => {
            if (Object.keys(itm)[0] === item._id) {
              result = itm[item._id];
            }
          });
          arr2.push({ quiz: item, result });
        }
      });
      this.setState({ onGoingQuizs: arr1 });
      this.setState({ pastQuizs: arr2 });
      this.setState({isLoading:false});
    }
  }
  onView(id) {
    this.props.history.push("/viewquiz/"+id);
  }
  render() {
    return (
      <div>
        {
          this.state.isLoading ? <Loading /> :
          <div className="container">
          <div className="mt-5">
            <h4 className="row justify-content-md-center">Ongoing Quizzes</h4>
            <SearchTable
              quizs={this.state.onGoingQuizs}
              onView={this.onView}
              isCurrent={true}
            />
          </div>
          <div className="mt-5">
            <h4 className="row justify-content-md-center">Past Quizzes</h4>
            <SearchTable
              quizs={this.state.pastQuizs}
              onView={this.onView}
              isCurrent={false}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

Results.propTypes = {
  fetchUserResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  results: state.data.results
});

export default connect(
  mapStateToProps,
  { fetchUserResults }
)(Results);

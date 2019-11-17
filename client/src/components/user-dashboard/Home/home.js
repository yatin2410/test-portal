import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserResults } from "../../../actions/fetchActions";
import Loading from "../../layout/Loading";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: [],
      currentIndex: 0,
      isLoading: true
    };
    this.getquizs = this.getquizs.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserResults(this.props.auth.user.id);
  }
  countAttemp(arr) {
    let cnt = 0;
    for (let item in arr) {
      if (arr[item].ans.length != 0) {
        cnt++;
      }
    }
    return cnt;
  }
  isSame(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    a.sort();
    b.sort();
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  countCorrect(arr) {
    let cnt = 0;
    for (let item in arr) {
      if (this.isSame(arr[item].ans, arr[item].realAns)) {
        cnt++;
      }
    }
    return cnt;
  }
  getquizs(arr) {
    if (arr.length !== 0) {
      let quizs = [];
      arr.forEach(item => {
        let attempted = this.countAttemp(item.result.qdata);
        let correct = this.countCorrect(item.result.qdata);
        let per = ((correct * 100) / item.quiz.questions.length).toFixed(2);
        let perToPass = item.quiz.perToPass;
        let result = per >= perToPass ? "Pass" : "Fail";
        quizs.push({
          _id: item.quiz._id,
          name: item.quiz.name,
          total: item.quiz.questions.length,
          attempted,
          correct,
          per,
          perToPass,
          result
        });
      });
      console.log(quizs);
      return quizs;
    }
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
      this.setState({ quizs: this.getquizs(arr) });
      this.setState({ isLoading: false });
    }
  }
  onChange(e) {
    console.log(e.target.value);
    this.setState({currentIndex:e.target.value});
  }
  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="row mt-5 ml-4">
            <div className="col">
              <LineChart quizs={this.state.quizs} />
            </div>
            <div className="col">
              <div className="row justify-content-md-center">
                <select
                  style={{ width: "50%" }}
                  type="text"
                  className="input"
                  onChange={this.onChange}
                  value={this.state.currentIndex}>
                  {this.state.quizs?this.state.quizs.map((item,index) => (
                    <option value={index}>{item.name}</option>
                  )):<options></options>}
                </select>
              </div>
              <div className="mt-4">
                <PieChart quiz={this.state.quizs?this.state.quizs[this.state.currentIndex]:null} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  fetchUserResults: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  results: state.data.results
});

export default connect(mapStateToProps, { fetchUserResults })(Home);
